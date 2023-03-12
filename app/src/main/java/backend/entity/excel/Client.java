package backend.entity.excel;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

@Data
@ExcelEntity(excelName = "Client", startRow = 1)
public class Client {
    @ExcelColumn(name = "客户代码", seq = 0)
    private String clientCode;

    @ExcelColumn(name = "客户名称", seq = 1)
    private String clientName;

    @ExcelColumn(name = "客户类型", seq = 2)
    private String clientType;

    public ValidationResult validate () {
        ValidationResult validationResult = new ValidationResult();

        if (StringUtils.isEmpty(this.clientCode)) {
            validationResult.setPassed(false);
            validationResult.setReport("用户代码不得为空！");
            return validationResult;
        }

        if (StringUtils.isEmpty(this.clientName)) {
            validationResult.setPassed(false);
            validationResult.setReport("用户名称不得为空！");
            return validationResult;
        }

        if (StringUtils.isEmpty(this.clientType)) {
            validationResult.setPassed(false);
            validationResult.setReport("用户类型不得为空！");
            return validationResult;
        }

        validationResult.setPassed(true);
        return validationResult;
    }

    public backend.entity.Client convertToMysqlEntity() {
        backend.entity.Client client = new backend.entity.Client();
        client.setClientCode(this.getClientCode());
        client.setClientName(this.getClientName());
        client.setClientType(this.getClientType());
        return client;
    }
}
