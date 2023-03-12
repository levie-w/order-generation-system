package backend.entity.dto;

import backend.entity.Client;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ClientResponseDto {
    private List<Client> result;
    private int code;
    private String message;
}
