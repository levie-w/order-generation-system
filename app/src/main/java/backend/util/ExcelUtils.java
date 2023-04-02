package backend.util;

import backend.entity.dto.ColumnDto;
import backend.entity.excel.ExcelColumn;
import backend.entity.excel.ExcelEntity;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class ExcelUtils {
    public static Map<String, Integer> getColumnNameWithIndex(Workbook workbook) {
        try {
            Sheet sheet = workbook.getSheetAt(0);
            Row firstRow = sheet.getRow(sheet.getFirstRowNum());
            int columnNum = firstRow.getLastCellNum();
            Map<String, Integer> columnNameIndexMapping = Maps.newLinkedHashMapWithExpectedSize(columnNum);
            for (int idx = firstRow.getFirstCellNum(); idx < columnNum; idx++) {
                String columnName = (String) ExcelColumn.ValueType.STRING.format(firstRow.getCell(idx));
                columnNameIndexMapping.put(columnName, idx);
            }
            return columnNameIndexMapping;
        } catch (Exception e) {
            return null;
        }
    }

    public static Pair<Map<String, Integer>, List<ColumnDto>> getColumnNameWithIndexAndColumnList(Workbook workbook) {
        try {
            Sheet sheet = workbook.getSheetAt(0);
            Row firstRow = sheet.getRow(sheet.getFirstRowNum());
            int columnNum = firstRow.getLastCellNum();
            Map<String, Integer> columnNameIndexMapping = Maps.newLinkedHashMapWithExpectedSize(columnNum);
            List<ColumnDto> columnList = Lists.newArrayList();
            int dataIndexNum = 0;
            for (int idx = firstRow.getFirstCellNum(); idx < columnNum; idx++) {
                String columnName = (String) ExcelColumn.ValueType.STRING.format(firstRow.getCell(idx));
                columnNameIndexMapping.put(columnName, idx);
                if (!columnName.contains("总流出量") && !columnName.contains("总客户数")) {
                    columnList.add(new ColumnDto(columnName, "c" + dataIndexNum));
                    dataIndexNum ++;
                }
            }
            columnList.add(new ColumnDto("客户", "clientName"));
            columnList.add(new ColumnDto("数量", "quantity"));
            columnList.add(new ColumnDto("日期", "date"));
            return Pair.of(columnNameIndexMapping, columnList);
        } catch (Exception e) {
            return Pair.of(null, null);
        }
    }

    public static List<Object> parseExcelFile(Workbook workbook, Class clazz) {
        ExcelEntity excelEntity = (ExcelEntity) clazz.getAnnotation(ExcelEntity.class);

        if (excelEntity != null) {
            Sheet sheet = workbook.getSheetAt(excelEntity.sheetAt());

            List<Object> objs = Lists.newArrayListWithCapacity(sheet.getLastRowNum());
            for (int idx = excelEntity.startRow(); idx <= sheet.getLastRowNum(); idx++) {
                Row row = sheet.getRow(idx);
                if (row != null) {
                    try {
                        Object obj = clazz.newInstance();
                        Field[] fields = clazz.getDeclaredFields();
                        for (Field field: fields) {
                            ExcelColumn excelColumn = field.getAnnotation(ExcelColumn.class);
                            if (excelColumn != null) {
                                field.setAccessible(true);
                                Cell cell = row.getCell(excelColumn.seq());
                                if (cell != null) {
                                    Object value = excelColumn.type().format(cell);
                                    field.set(obj, value);
                                } else {
                                    field.set(obj, null);
                                }
                            }
                        }

                        objs.add(obj);
                    } catch (IllegalAccessException | InstantiationException exception) {
                        log.error(String.format("Failed to parse excel file %s at row %d", excelEntity.excelName(), idx));
                    }
                }
            }
            return objs;
        }

        return null;
    }
}
