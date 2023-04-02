package backend.entity.excel;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.ss.usermodel.Cell;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ExcelColumn {
    enum ValueType {
        INTEGER {
            public Integer format(Cell cell) {
                if (cell == null || Cell.CELL_TYPE_BLANK == cell.getCellType()) {
                    return null;
                }
                if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
                    return new Double(cell.getNumericCellValue()).intValue();
                }
                if (cell.getCellType() == Cell.CELL_TYPE_STRING) {
                    try {
                        return Integer.valueOf(cell.getStringCellValue());
                    } catch (NumberFormatException nfe) {
                        return null;
                    }
                }
                return null;
            }
        },

        LONG {
            public Long format(Cell cell) {
                if (cell == null || Cell.CELL_TYPE_BLANK == cell.getCellType()) {
                    return null;
                }
                if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
                    return new Double(cell.getNumericCellValue()).longValue();
                }
                if (cell.getCellType() == Cell.CELL_TYPE_STRING) {
                    try {
                        return Long.valueOf(cell.getStringCellValue());
                    } catch (NumberFormatException nfe) {
                        return null;
                    }
                }
                return null;
            }
        },

        DOUBLE {
            public Double format(Cell cell) {
                if (cell == null || Cell.CELL_TYPE_BLANK == cell.getCellType()) {
                    return null;
                }
                if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
                    return cell.getNumericCellValue();
                }
                if (cell.getCellType() == Cell.CELL_TYPE_STRING) {
                    try {
                        return Double.valueOf(cell.getStringCellValue());
                    } catch (NumberFormatException nfe) {
                        return null;
                    }
                }
                return null;
            }
        },

        STRING {
            final SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
            final DecimalFormat decimalFormatter = new DecimalFormat("###################.###########");

            public String format(Cell cell) {
                if (cell == null || Cell.CELL_TYPE_BLANK == cell.getCellType()) {
                    return null;
                }
                if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
                    if (HSSFDateUtil.isCellDateFormatted(cell)) {
                        Date date = cell.getDateCellValue();
                        return dateFormatter.format(date);
                    }
                    return decimalFormatter.format(cell.getNumericCellValue());
                }
                if (cell.getCellType() == Cell.CELL_TYPE_BOOLEAN) {
                    return String.valueOf(cell.getBooleanCellValue());
                }
                return cell.getStringCellValue().replaceAll("\\s+", " ");
            }
        };

        public abstract Object format(Cell cell);
    }

    int seq();

    String name() default "";

    ValueType type() default ValueType.STRING;
}
