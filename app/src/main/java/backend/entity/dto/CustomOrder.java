package backend.entity.dto;

import com.google.common.collect.Lists;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

@Getter
@Setter
public class CustomOrder implements Cloneable {
    private String c0;
    private String c1;
    private String c2;
    private String c3;
    private String c4;
    private String c5;
    private String c6;
    private String c7;
    private String c8;
    private String c9;
    private String c10;
    private String c11;
    private String c12;
    private String c13;
    private String c14;
    private String c15;
    private String c16;
    private String c17;
    private String c18;
    private String c19;
    private String clientName;
    private Integer quantity;
    private String date;

    // only for conditions
    private int productQuantity;
    private int clientQuantity;

    public void setColumn(String value) {
        if (StringUtils.isEmpty(c0)) {
            c0 = value;
        } else if (StringUtils.isEmpty(c1)) {
            c1 = value;
        }  else if (StringUtils.isEmpty(c2)) {
            c2 = value;
        } else if (StringUtils.isEmpty(c3)) {
            c3 = value;
        } else if (StringUtils.isEmpty(c4)) {
            c4 = value;
        } else if (StringUtils.isEmpty(c5)) {
            c5 = value;
        } else if (StringUtils.isEmpty(c6)) {
            c6 = value;
        } else if (StringUtils.isEmpty(c7)) {
            c7 = value;
        } else if (StringUtils.isEmpty(c8)) {
            c8 = value;
        } else if (StringUtils.isEmpty(c9)) {
            c9 = value;
        } else if (StringUtils.isEmpty(c10)) {
            c10 = value;
        } else if (StringUtils.isEmpty(c11)) {
            c11 = value;
        } else if (StringUtils.isEmpty(c12)) {
            c12 = value;
        } else if (StringUtils.isEmpty(c13)) {
            c13 = value;
        } else if (StringUtils.isEmpty(c14)) {
            c14 = value;
        } else if (StringUtils.isEmpty(c15)) {
            c15 = value;
        } else if (StringUtils.isEmpty(c16)) {
            c16 = value;
        } else if (StringUtils.isEmpty(c17)) {
            c17 = value;
        } else if (StringUtils.isEmpty(c18)) {
            c18 = value;
        } else if (StringUtils.isEmpty(c19)) {
            c19 = value;
        }
    }

    public CustomOrder clone() {
        CustomOrder customOrder = new CustomOrder();
        customOrder.setC0(c0);
        customOrder.setC1(c1);
        customOrder.setC2(c2);
        customOrder.setC3(c3);
        customOrder.setC4(c4);
        customOrder.setC5(c5);
        customOrder.setC6(c6);
        customOrder.setC7(c7);
        customOrder.setC8(c8);
        customOrder.setC9(c9);
        customOrder.setC10(c10);
        customOrder.setC11(c11);
        customOrder.setC12(c12);
        customOrder.setC13(c13);
        customOrder.setC14(c14);
        customOrder.setC15(c15);
        customOrder.setC16(c16);
        customOrder.setC17(c17);
        customOrder.setC18(c18);
        customOrder.setC19(c19);

        return customOrder;
    }

    public List<Object> getNotNullValues() {
        List<Object> values = Lists.newArrayList();
        if (StringUtils.isNotEmpty(c0)) {
            values.add(c0);
        }
        if (StringUtils.isNotEmpty(c1)) {
            values.add(c1);
        }
        if (StringUtils.isNotEmpty(c2)) {
            values.add(c2);
        }
        if (StringUtils.isNotEmpty(c3)) {
            values.add(c3);
        }
        if (StringUtils.isNotEmpty(c4)) {
            values.add(c4);
        }
        if (StringUtils.isNotEmpty(c5)) {
            values.add(c5);
        }
        if (StringUtils.isNotEmpty(c6)) {
            values.add(c6);
        }
        if (StringUtils.isNotEmpty(c7)) {
            values.add(c7);
        }
        if (StringUtils.isNotEmpty(c8)) {
            values.add(c8);
        }
        if (StringUtils.isNotEmpty(c9)) {
            values.add(c9);
        }
        if (StringUtils.isNotEmpty(c10)) {
            values.add(c10);
        }
        if (StringUtils.isNotEmpty(c11)) {
            values.add(c11);
        }
        if (StringUtils.isNotEmpty(c12)) {
            values.add(c12);
        }
        if (StringUtils.isNotEmpty(c13)) {
            values.add(c13);
        }
        if (StringUtils.isNotEmpty(c14)) {
            values.add(c14);
        }
        if (StringUtils.isNotEmpty(c15)) {
            values.add(c15);
        }
        if (StringUtils.isNotEmpty(c16)) {
            values.add(c16);
        }
        if (StringUtils.isNotEmpty(c17)) {
            values.add(c17);
        }
        if (StringUtils.isNotEmpty(c18)) {
            values.add(c18);
        }
        if (StringUtils.isNotEmpty(c19)) {
            values.add(c19);
        }
        if (StringUtils.isNotEmpty(clientName)) {
            values.add(clientName);
        }
        if (quantity != null && quantity > 0) {
            values.add(quantity);
        }
        if (StringUtils.isNotEmpty(date)) {
            values.add(date);
        }
        return values;
    }
}
