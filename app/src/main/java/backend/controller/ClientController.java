package backend.controller;

import backend.entity.dto.ClientResponseDto;
import backend.entity.excel.Client;
import backend.entity.excel.ValidationResult;
import backend.service.ClientService;
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

    @GetMapping("/listAll")
    @ResponseBody
    public ClientResponseDto listAllClients() {
        ClientResponseDto clientResponseDto = new ClientResponseDto();

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
    public ClientResponseDto createClient(@RequestBody backend.entity.Client client) {
        ClientResponseDto clientResponseDto = new ClientResponseDto();

        try {
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
    public ClientResponseDto updateClient(@RequestBody backend.entity.Client client) {
        ClientResponseDto clientResponseDto = new ClientResponseDto();

        try {
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
    public ClientResponseDto deleteClient(@RequestParam("clientId") Long clientId) {
        clientService.deleteClient(clientId);

        ClientResponseDto clientResponseDto = new ClientResponseDto();
        clientResponseDto.setCode(200);

        return clientResponseDto;
    }

    @PostMapping("/batchCreate")
    @ResponseBody
    public ClientResponseDto createClients(@RequestParam("file") MultipartFile clientsFile,
                                           @RequestParam("override") Boolean override) {
        ClientResponseDto clientResponseDto = new ClientResponseDto();

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
