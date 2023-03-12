package backend.entity.dto;

import backend.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResult {
    private int code;
    private String report;
    private User user;
}
