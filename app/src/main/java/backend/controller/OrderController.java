package backend.controller;

import backend.entity.dto.*;
import backend.entity.excel.ExcelColumn;
import backend.entity.excel.OrderCondition;
import backend.entity.excel.ValidationResult;
import backend.service.OrderService;
import backend.service.UserService;
import backend.util.ExcelUtils;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
@Slf4j
@RequestMapping("/order")
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/generate")
    @ResponseBody
    public OrderResponseDto generateOrders(@RequestParam("startDate") String startDate,
                                           @RequestParam("endDate") String endDate,
                                           @RequestParam("file") MultipartFile orderConditionFile,
                                           @RequestParam("clientTypes") List<String> clientTypes,
                                           @RequestParam("userId") Long userId,
                                           @RequestParam("version") Long version) {
        OrderResponseDto orderResponseDto = new OrderResponseDto();

        Validity validity = userService.validateUser(userId, version);
        if (!validity.isPassed()) {
            orderResponseDto.setCode(501);
            return orderResponseDto;
        }

        if (orderConditionFile == null
                || StringUtils.isEmpty(orderConditionFile.getOriginalFilename())
                || (!orderConditionFile.getOriginalFilename().endsWith(".xlsx")
                && !orderConditionFile.getOriginalFilename().endsWith(".xls"))) {
            orderResponseDto.setCode(500);
            orderResponseDto.setMessage("请正确上传excel格式的文件(.xlsx .xls)!");
            return orderResponseDto;
        }

        if (startDate == null || endDate == null) {
            orderResponseDto.setCode(500);
            orderResponseDto.setMessage("请正确选择起始日期和结束日期!");
            return orderResponseDto;
        }

        try {
            List<Order> orders = Lists.newArrayList();

            Workbook workbook = WorkbookFactory.create(orderConditionFile.getInputStream());
            List<Object> orderConditionList = ExcelUtils.parseExcelFile(workbook, OrderCondition.class);
            if (CollectionUtils.isEmpty(orderConditionList)) {
                orderResponseDto.setCode(500);
                orderResponseDto.setMessage("excel文件内容有误!");
                return orderResponseDto;
            }

            for (int idx = 0; idx < orderConditionList.size(); idx++) {
                OrderCondition orderCondition = (OrderCondition) orderConditionList.get(idx);

                if (StringUtils.isEmpty(orderCondition.getProductName())) {
                    continue;
                }

                ValidationResult validationResult = orderCondition.validate();
                if (BooleanUtils.isFalse(validationResult.isPassed())) {
                    orderResponseDto.setCode(500);
                    orderResponseDto.setMessage(String.format("第%d行：%s", idx + 2, validationResult.getReport()));
                    return orderResponseDto;
                }

                List<Order> ordersForEach = orderService.generateOrders(orderCondition, startDate, endDate, clientTypes);
                if (CollectionUtils.isNotEmpty(ordersForEach)) {
                    orders.addAll(ordersForEach);
                }
            }

            orderResponseDto.setCode(200);
            orderResponseDto.setResult(orders);
        } catch (Exception e) {
            orderResponseDto.setCode(500);
            orderResponseDto.setMessage(e.getMessage());
        }

        return orderResponseDto;
    }

    @PostMapping("/advanced/generate")
    @ResponseBody
    public CustomOrderResponseDto generateOrders(@RequestParam("startDate") String startDate,
                                                 @RequestParam("endDate") String endDate,
                                                 @RequestParam("orderConditionFile") MultipartFile orderConditionFile,
                                                 @RequestParam("clientTypes") List<String> clientTypes,
                                                 @RequestParam(value = "clientFile", required = false) MultipartFile clientFile,
                                                 @RequestParam("userId") Long userId,
                                                 @RequestParam("version") Long version) {
        CustomOrderResponseDto orderResponseDto = new CustomOrderResponseDto();

        Validity validity = userService.validateUser(userId, version);
        if (!validity.isPassed()) {
            orderResponseDto.setCode(501);
            return orderResponseDto;
        }

        if (orderConditionFile == null
                || StringUtils.isEmpty(orderConditionFile.getOriginalFilename())
                || (!orderConditionFile.getOriginalFilename().endsWith(".xlsx")
                && !orderConditionFile.getOriginalFilename().endsWith(".xls"))) {
            orderResponseDto.setCode(500);
            orderResponseDto.setMessage("请正确上传excel格式的文件(.xlsx .xls)!");
            return orderResponseDto;
        }

        if (startDate == null || endDate == null) {
            orderResponseDto.setCode(500);
            orderResponseDto.setMessage("请正确选择起始日期和结束日期!");
            return orderResponseDto;
        }

        try {
            // parse client file
            Map<String, String> clientNamesWithType = Maps.newHashMap();
            if (clientFile != null && !clientFile.isEmpty()) {
                Workbook clientWorkbook = WorkbookFactory.create(clientFile.getInputStream());
                Map<String, Integer> clientFileColumnNameWithIndexMapping = ExcelUtils.getColumnNameWithIndex(clientWorkbook);
                if (clientFileColumnNameWithIndexMapping == null || clientFileColumnNameWithIndexMapping.isEmpty()) {
                    orderResponseDto.setCode(500);
                    orderResponseDto.setMessage("检测不到客户名单第一行存在列名!");
                    return orderResponseDto;
                }

                int clientNameIndex = -1;
                int clientTypeIndex = -1;
                for (Map.Entry<String, Integer> entry : clientFileColumnNameWithIndexMapping.entrySet()) {
                    if (entry.getKey().contains("客户名称")) {
                        clientNameIndex = entry.getValue();
                    }
                    if (entry.getKey().contains("客户类型")) {
                        clientTypeIndex = entry.getValue();
                    }
                }
                if (clientNameIndex < 0) {
                    orderResponseDto.setCode(500);
                    orderResponseDto.setMessage("客户名单须包含[客户名称]!");
                    return orderResponseDto;
                }
                if (CollectionUtils.isNotEmpty(clientTypes) && clientTypeIndex < 0) {
                    orderResponseDto.setCode(500);
                    orderResponseDto.setMessage("客户名单须包含[客户类型]!");
                    return orderResponseDto;
                }

                Sheet sheet = clientWorkbook.getSheetAt(0);
                for (int rowNum = 1; rowNum <= sheet.getLastRowNum(); rowNum++) {
                    Row row = sheet.getRow(rowNum);
                    Cell clientNameCell = row.getCell(clientNameIndex);
                    Cell clientTypeCell;
                    if (clientTypeIndex >= 0) {
                        clientTypeCell = row.getCell(clientTypeIndex);
                        clientNamesWithType.put((String) ExcelColumn.ValueType.STRING.format(clientNameCell), (String) ExcelColumn.ValueType.STRING.format(clientTypeCell));
                    } else {
                        clientNamesWithType.put((String) ExcelColumn.ValueType.STRING.format(clientNameCell), "unknown");
                    }
                }
            }

            // parse order condition file
            Workbook orderConditionWorkbook = WorkbookFactory.create(orderConditionFile.getInputStream());
            Pair<Map<String, Integer>, List<ColumnDto>> columnNameWithIndexAndColumnList = ExcelUtils.getColumnNameWithIndexAndColumnList(orderConditionWorkbook);
            Map<String, Integer> conditionFileColumnNameIndexMapping = columnNameWithIndexAndColumnList.getLeft();
            List<ColumnDto> columnList = columnNameWithIndexAndColumnList.getRight();
            List<String> columnNameList = Lists.newArrayListWithCapacity(columnList.size());
            columnList.forEach(columnDto -> columnNameList.add(columnDto.getTitle()));
            if (conditionFileColumnNameIndexMapping == null || conditionFileColumnNameIndexMapping.isEmpty()) {
                orderResponseDto.setCode(500);
                orderResponseDto.setMessage("检测不到条件列表第一行存在列名!");
                return orderResponseDto;
            }

            int productQuantityIndex = -1;
            int clientQuantityIndex = -1;
            for (Map.Entry<String, Integer> entry : conditionFileColumnNameIndexMapping.entrySet()) {
                if (entry.getKey().contains("总流出量")) {
                    productQuantityIndex = entry.getValue();
                }
                if (entry.getKey().contains("总客户数")) {
                    clientQuantityIndex = entry.getValue();
                }
            }
            if (productQuantityIndex < 0 || clientQuantityIndex < 0) {
                orderResponseDto.setCode(500);
                orderResponseDto.setMessage("条件须包含[总流出量]和[总客户数]!");
                return orderResponseDto;
            }

            Sheet sheet = orderConditionWorkbook.getSheetAt(0);
            List<CustomOrder> orders = Lists.newArrayListWithCapacity(sheet.getLastRowNum());
            List<Map<String, Object>> ordersInExcel = Lists.newArrayListWithCapacity(sheet.getLastRowNum());
            for (int rowNum = 1; rowNum <= sheet.getLastRowNum(); rowNum++) {
                Row row = sheet.getRow(rowNum);
                CustomOrder customOrderCondition = new CustomOrder();
                Iterator<Cell> cellIterator = row.cellIterator();
                int idx = 0;
                while (cellIterator.hasNext()) {
                    Cell cell = cellIterator.next();
                    if (idx == productQuantityIndex) {
                        customOrderCondition.setProductQuantity((Integer) ExcelColumn.ValueType.INTEGER.format(cell));
                    } else if (idx == clientQuantityIndex) {
                        customOrderCondition.setClientQuantity((Integer) ExcelColumn.ValueType.INTEGER.format(cell));
                    } else {
                        customOrderCondition.setColumn((String) ExcelColumn.ValueType.STRING.format(cell));
                    }
                    idx++;
                }
                Pair<List<CustomOrder>, List<Map<String, Object>>> ordersForEach = orderService.generateOrders(customOrderCondition, columnNameList, startDate, endDate, clientTypes, clientNamesWithType);
                if (CollectionUtils.isNotEmpty(ordersForEach.getLeft()) && CollectionUtils.isNotEmpty(ordersForEach.getRight())) {
                    orders.addAll(ordersForEach.getLeft());
                    ordersInExcel.addAll(ordersForEach.getRight());
                }
            }

            orderResponseDto.setCode(200);
            orderResponseDto.setColumnList(columnList);
            orderResponseDto.setColumnNameList(columnNameList);
            orderResponseDto.setResult(orders);
            orderResponseDto.setExcelResult(ordersInExcel);
        } catch (Exception e) {
            orderResponseDto.setCode(500);
            orderResponseDto.setMessage(e.getMessage());
        }

        return orderResponseDto;
    }
}
