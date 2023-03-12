package backend.entity.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderResponseDto {
    private List<Order> result;
    private int code;
    private String message;
}
