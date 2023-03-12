package backend.entity.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ClientRequestDto {
    private Long userId;
    private Long version;
    private Long clientId;
    private String clientCode;
    private String clientName;
    private String clientType;
}
