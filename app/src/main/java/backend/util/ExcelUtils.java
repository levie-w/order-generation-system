package backend.util;

import backend.entity.excel.ExcelColumn;
import backend.entity.excel.ExcelEntity;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;

@Slf4j
@Service
public class ExcelUtils {
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
