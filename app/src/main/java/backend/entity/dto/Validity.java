package backend.entity.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Validity {
    private boolean passed;
    private int level;
}
