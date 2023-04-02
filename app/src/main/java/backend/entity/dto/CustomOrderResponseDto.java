package backend.entity.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class CustomOrderResponseDto {
    private List<CustomOrder> result;
    private List<Map<String, Object>> excelResult;
    private List<ColumnDto> columnList;
    private List<String> columnNameList;
    private int code;
    private String message;
}
