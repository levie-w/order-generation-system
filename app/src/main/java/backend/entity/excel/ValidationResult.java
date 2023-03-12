package backend.entity.excel;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValidationResult {
    private boolean passed;
    private String report;
}
