package backend.entity.dto;

import backend.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserResponseDto {
    private Long userId;
    private String username;
    private Integer level;
    private Long version;
    private List<User> result;
    private int code;
    private String message;
}
