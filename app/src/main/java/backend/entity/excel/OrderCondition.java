package backend.entity.excel;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

@Data
@ExcelEntity(excelName = "OrderCondition", startRow = 1)
public class OrderCondition {
    @ExcelColumn(name = "商品名称", seq = 0)
    private String productName;

    @ExcelColumn(name = "规格", seq = 1)
    private String specification;

    @ExcelColumn(name = "生产厂商", seq = 2)
    private String manufacturer;

    @ExcelColumn(name = "批号", seq = 3)
    private String batchNumber;

    @ExcelColumn(name = "有效期", seq = 4)
    private String validityDate;

    @ExcelColumn(name = "单价", seq = 5, type = ExcelColumn.ValueType.DOUBLE)
    private Double price;

    @ExcelColumn(name = "总流出量", seq = 6, type = ExcelColumn.ValueType.INTEGER)
    private Integer productQuantity;

    @ExcelColumn(name = "总客户数", seq = 7, type = ExcelColumn.ValueType.INTEGER)
    private Integer clientQuantity;

    public ValidationResult validate () {
        ValidationResult validationResult = new ValidationResult();

        if (StringUtils.isEmpty(this.productName)) {
            validationResult.setPassed(false);
            validationResult.setReport("商品名称不得为空！");
            return validationResult;
        }

        if (this.getProductQuantity() <= 0 || this.getClientQuantity() <= 0 || this.getClientQuantity() > this.getProductQuantity()) {
            validationResult.setPassed(false);
            validationResult.setReport("总流出量和总客户数须得大于零，且总客户数不得大于总流出量！");
            return validationResult;
        }

        validationResult.setPassed(true);
        return validationResult;
    }
}
