package backend.entity.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserRequestDto {
    private Long operatingUserId;
    private Long operatingVersion;

    private Long userId;
    private String username;
    private String password;
    private Integer level;
}
