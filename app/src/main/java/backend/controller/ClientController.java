package backend.controller;

import backend.entity.dto.ClientRequestDto;
import backend.entity.dto.ClientResponseDto;
import backend.entity.dto.Validity;
import backend.entity.excel.Client;
import backend.entity.excel.ValidationResult;
import backend.service.ClientService;
import backend.service.UserService;
import backend.util.ExcelUtils;
import com.google.common.collect.Lists;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
@RequestMapping("/client")
@RestController
public class ClientController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private UserService userService;

    @GetMapping("/listAll")
    @ResponseBody
    public ClientResponseDto listAllClients(@RequestParam("userId") Long userId,
                                            @RequestParam("version") Long version) {
        ClientResponseDto clientResponseDto = new ClientResponseDto();

        Validity validity = userService.validateUser(userId, version);
        if (!validity.isPassed()) {
            clientResponseDto.setCode(501);
            return clientResponseDto;
        }

        List<backend.entity.Client> clients = clientService.getAllClients();
        if (CollectionUtils.isEmpty(clients)) {
            clientResponseDto.setCode(500);
            clientResponseDto.setMessage("找不到客户名单！");
            return clientResponseDto;
        }

        clientResponseDto.setResult(clients);
        clientResponseDto.setCode(200);
        return clientResponseDto;
    }

    @PostMapping("/create")
    @ResponseBody
    public ClientResponseDto createClient(@RequestBody ClientRequestDto clientRequestDto) {
        ClientResponseDto clientResponseDto = new ClientResponseDto();

        Validity validity = userService.validateUser(clientRequestDto.getUserId(), clientRequestDto.getVersion());
        if (!validity.isPassed()) {
            clientResponseDto.setCode(501);
            return clientResponseDto;
        }

        try {
            backend.entity.Client client = new backend.entity.Client();
            client.setClientCode(clientRequestDto.getClientCode());
            client.setClientName(clientRequestDto.getClientName());
            client.setClientType(clientRequestDto.getClientType());
            clientService.saveClient(client);
            clientResponseDto.setCode(200);
        } catch (Exception e) {
            clientResponseDto.setCode(500);
            clientResponseDto.setMessage(e.getMessage());
        }

        return clientResponseDto;
    }

    @PostMapping("/edit")
    @ResponseBody
    public ClientResponseDto updateClient(@RequestBody ClientRequestDto clientRequestDto) {
        ClientResponseDto clientResponseDto = new ClientResponseDto();

        Validity validity = userService.validateUser(clientRequestDto.getUserId(), clientRequestDto.getVersion());
        if (!validity.isPassed()) {
            clientResponseDto.setCode(501);
            return clientResponseDto;
        }

        try {
            backend.entity.Client client = new backend.entity.Client();
            client.setClientId(clientRequestDto.getClientId());
            client.setClientCode(clientRequestDto.getClientCode());
            client.setClientName(clientRequestDto.getClientName());
            client.setClientType(clientRequestDto.getClientType());
            clientService.saveClient(client);
            clientResponseDto.setCode(200);
        } catch (Exception e) {
            clientResponseDto.setCode(500);
            clientResponseDto.setMessage(e.getMessage());
        }

        return clientResponseDto;
    }

    @GetMapping("/delete")
    @ResponseBody
    public ClientResponseDto deleteClient(@RequestParam("clientId") Long clientId,
                                          @RequestParam("userId") Long userId,
                                          @RequestParam("version") Long version) {
        ClientResponseDto clientResponseDto = new ClientResponseDto();

        Validity validity = userService.validateUser(userId, version);
        if (!validity.isPassed()) {
            clientResponseDto.setCode(501);
            return clientResponseDto;
        }

        clientService.deleteClient(clientId);

        clientResponseDto.setCode(200);

        return clientResponseDto;
    }

    @PostMapping("/batchCreate")
    @ResponseBody
    public ClientResponseDto createClients(@RequestParam("file") MultipartFile clientsFile,
                                           @RequestParam("override") Boolean override,
                                           @RequestParam("userId") Long userId,
                                           @RequestParam("version") Long version) {
        ClientResponseDto clientResponseDto = new ClientResponseDto();

        Validity validity = userService.validateUser(userId, version);
        if (!validity.isPassed()) {
            clientResponseDto.setCode(501);
            return clientResponseDto;
        }

        if (clientsFile == null
                || StringUtils.isEmpty(clientsFile.getOriginalFilename())
                || (!clientsFile.getOriginalFilename().endsWith(".xlsx")
                && !clientsFile.getOriginalFilename().endsWith(".xls"))) {
            clientResponseDto.setCode(500);
            clientResponseDto.setMessage("请正确上传excel格式的文件（.xlsx .xls）!");
            return clientResponseDto;
        }

        try {
            List<Client> excelClients = Lists.newArrayList();

            Workbook workbook = WorkbookFactory.create(clientsFile.getInputStream());
            List<Object> clientList = ExcelUtils.parseExcelFile(workbook, backend.entity.excel.Client.class);
            if (CollectionUtils.isEmpty(clientList)) {
                clientResponseDto.setCode(500);
                clientResponseDto.setMessage("excel文件内容有误！");
                return clientResponseDto;
            }

            for (Object obj : clientList) {
                Client client = (Client) obj;
                ValidationResult validationResult = client.validate();
                if (BooleanUtils.isFalse(validationResult.isPassed())) {
                    continue;
                }

                excelClients.add(client);
            }

            List<backend.entity.Client> clients = clientService.saveClients(excelClients, override);
            clientResponseDto.setCode(200);
            clientResponseDto.setResult(clients);
        } catch (Exception e) {
            clientResponseDto.setCode(500);
            clientResponseDto.setMessage(e.getMessage());
        }

        return clientResponseDto;
    }
}
