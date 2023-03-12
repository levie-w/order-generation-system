package backend.controller;

import backend.entity.excel.ValidationResult;
import com.google.common.collect.Lists;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import backend.entity.dto.Order;
import backend.entity.dto.OrderResponseDto;
import backend.entity.excel.OrderCondition;
import backend.service.OrderService;
import backend.util.ExcelUtils;

import java.util.List;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
@RequestMapping("/order")
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/generate")
    @ResponseBody
    public OrderResponseDto generateOrders(@RequestParam("startDate") String startDate,
                                           @RequestParam("endDate") String endDate,
                                           @RequestParam("file") MultipartFile orderConditionFile,
                                           @RequestParam("clientTypes") List<String> clientTypes) {
        OrderResponseDto orderResponseDto = new OrderResponseDto();

        if (orderConditionFile == null
                || StringUtils.isEmpty(orderConditionFile.getOriginalFilename())
                || (!orderConditionFile.getOriginalFilename().endsWith(".xlsx")
                && !orderConditionFile.getOriginalFilename().endsWith(".xls"))) {
            orderResponseDto.setCode(500);
            orderResponseDto.setMessage("请正确上传excel格式的文件（.xlsx .xls）!");
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
                orderResponseDto.setMessage("excel文件内容有误！");
                return orderResponseDto;
            }

            for (int idx = 0; idx < orderConditionList.size(); idx++) {
                OrderCondition orderCondition = (OrderCondition) orderConditionList.get(idx);
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
}
