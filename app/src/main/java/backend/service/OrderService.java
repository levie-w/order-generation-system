package backend.service;

import backend.entity.Client;
import backend.entity.dto.CustomOrder;
import backend.entity.dto.Order;
import backend.entity.excel.OrderCondition;
import backend.util.AlgorithmUtils;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

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

        List<Integer> productQuantityGroups = groupProducts(productQuantity, clientQuantity);

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

    public Pair<List<CustomOrder>, List<Map<String, Object>>> generateOrders(CustomOrder customOrderCondition, List<String> columnNameList, String startDate, String endDate, List<String> clientTypes, Map<String, String> clientNamesWithType) throws ParseException {
        List<String> clientNames;
        int clientQuantity;
        if (clientNamesWithType == null || clientNamesWithType.isEmpty()) {
            List<Client> clients = clientService.getRandomClients(customOrderCondition.getClientQuantity(), clientTypes);
            clientNames = Lists.newArrayListWithCapacity(clients.size());
            clients.forEach(client -> clientNames.add(client.getClientName()));
        } else {
            clientNames = clientService.getRandomClientNames(customOrderCondition.getClientQuantity(), clientNamesWithType, clientTypes);
        }
        clientQuantity = clientNames.size();

        int productQuantity = customOrderCondition.getProductQuantity();

        List<Integer> productQuantityGroups = groupProducts(productQuantity, clientQuantity);

        List<String> dates = AlgorithmUtils.getRandomDates(startDate, endDate, clientQuantity);

        List<CustomOrder> orders = Lists.newArrayListWithCapacity(clientQuantity);
        List<Map<String, Object>> ordersInExcel = Lists.newArrayListWithCapacity(clientQuantity);
        for (int i = 0; i < clientQuantity; i++) {
            CustomOrder order = ObjectUtils.clone(customOrderCondition);

            order.setClientName(clientNames.get(i));
            order.setQuantity(productQuantityGroups.get(i));
            order.setDate(dates.get(i));
            orders.add(order);

            Map<String, Object> orderInExcel = Maps.newLinkedHashMap();
            List<Object> values = order.getNotNullValues();
            for (int j = 0; j < values.size(); j++) {
                orderInExcel.put(columnNameList.get(j), values.get(j));
            }
            ordersInExcel.add(orderInExcel);
        }

        return Pair.of(orders, ordersInExcel);
    }

    private List<Integer> groupProducts(int productQuantity, int groupNum) {
        List<Integer> productQuantityGroups = Lists.newArrayListWithCapacity(groupNum);

        if (productQuantity <= 10) {
            int[] productQuantityForEach = AlgorithmUtils.splitInteger(productQuantity, groupNum, false);
            for (int each : productQuantityForEach) {
                productQuantityGroups.add(each);
            }
        } else {
            int remainder = productQuantity % 5;
            int totalGroups = (productQuantity - remainder) / 5;

            if (remainder > 0) {
                // 以5为单位切分出来的组还不够客户来分的情况
                if (totalGroups < groupNum - 1) {
                    int[] productQuantityForEach = AlgorithmUtils.splitInteger(productQuantity, groupNum, false);
                    for (int each : productQuantityForEach) {
                        productQuantityGroups.add(each);
                    }
                } else {
                    int[] groupsForEach = AlgorithmUtils.splitInteger(totalGroups, groupNum - 1, false);
                    productQuantityGroups.add(remainder);
                    for (int each : groupsForEach) {
                        productQuantityGroups.add(each * 5);
                    }
                }
            } else {
                if (totalGroups < groupNum) {
                    int[] productQuantityForEach = AlgorithmUtils.splitInteger(productQuantity, groupNum, false);
                    for (int each : productQuantityForEach) {
                        productQuantityGroups.add(each);
                    }
                } else {
                    int[] groupsForEach = AlgorithmUtils.splitInteger(totalGroups, groupNum, false);
                    for (int each : groupsForEach) {
                        productQuantityGroups.add(each * 5);
                    }
                }
            }
        }

        return productQuantityGroups;
    }
}
