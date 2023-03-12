package backend.entity.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Order {
    private String productName;
    private String specification;
    private String manufacturer;
    private String batchNumber;
    private String validityDate;
    private Double price;
    private String clientName;
    private Integer quantity;
    private String date;
}
