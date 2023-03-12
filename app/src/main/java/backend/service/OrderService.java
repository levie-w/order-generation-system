package backend.service;

import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import backend.entity.Client;
import backend.entity.dto.Order;
import backend.entity.excel.OrderCondition;
import backend.util.AlgorithmUtils;

import java.text.ParseException;
import java.util.List;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
@Slf4j
@Service
public class OrderService {

    @Autowired
    private ClientService clientService;

    public List<Order> generateOrders(OrderCondition orderCondition, String startDate, String endDate, List<String> clientTypes) throws ParseException {
        List<Client> clients = clientService.getRandomClients(orderCondition.getClientQuantity(), clientTypes);
        int clientQuantity = clients.size();
        int productQuantity = orderCondition.getProductQuantity();

        List<Integer> productQuantityGroups = Lists.newArrayListWithCapacity(clientQuantity);
        if (productQuantity <= 10) {
            int[] productQuantityForEach = AlgorithmUtils.splitInteger(productQuantity, clientQuantity, false);
            for (int each : productQuantityForEach) {
                productQuantityGroups.add(each);
            }
        } else {
            int remainder = productQuantity % 5;
            int totalGroups = (productQuantity - remainder) / 5;

            if (remainder > 0) {
                int[] groupsForEach = AlgorithmUtils.splitInteger(totalGroups, clientQuantity - 1, false);
                productQuantityGroups.add(remainder);
                for (int each : groupsForEach) {
                    productQuantityGroups.add(each * 5);
                }
            } else {
                int[] groupsForEach = AlgorithmUtils.splitInteger(totalGroups, clientQuantity, false);
                for (int each : groupsForEach) {
                    productQuantityGroups.add(each * 5);
                }
            }
        }

        List<String> dates = AlgorithmUtils.getRandomDates(startDate, endDate, clientQuantity);

        List<Order> orders = Lists.newArrayListWithCapacity(clientQuantity);
        for (int i = 0; i < clientQuantity; i++) {
            Order order = new Order();
            order.setProductName(orderCondition.getProductName());
            order.setSpecification(orderCondition.getSpecification());
            order.setManufacturer(orderCondition.getManufacturer());
            order.setBatchNumber(orderCondition.getBatchNumber());
            order.setValidityDate(orderCondition.getValidityDate());
            order.setPrice(orderCondition.getPrice());
            order.setClientName(clients.get(i).getClientName());
            order.setQuantity(productQuantityGroups.get(i));
            order.setDate(dates.get(i));
            orders.add(order);
        }

        return orders;
    }
}
