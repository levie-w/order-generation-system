package backend.service;

import backend.entity.Client;
import backend.repository.ClientRepository;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
@Slf4j
@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Transactional
    public List<Client> saveClients(List<backend.entity.excel.Client> excelClients, Boolean override) {
        if (CollectionUtils.isNotEmpty(excelClients)) {
            List<Client> clients = Lists.newArrayListWithCapacity(excelClients.size());
            excelClients.forEach(excelClient -> {
                clients.add(excelClient.convertToMysqlEntity());
            });

            if (override) {
                clientRepository.truncateTable();
            }

            return clientRepository.saveAll(clients);
        }

        return null;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    public void deleteClient(Long clientId) {
        clientRepository.deleteById(clientId);
    }

    public List<Client> getRandomClients(int num, List<String> clientTypes) {
        if (CollectionUtils.isNotEmpty(clientTypes)) {
            return clientRepository.getRandomClients(num, clientTypes);
        }
        return clientRepository.getRandomClients(num);
    }
}
