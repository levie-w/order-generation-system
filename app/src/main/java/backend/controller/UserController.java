package backend.controller;

import backend.entity.User;
import backend.entity.dto.AuthenticationResult;
import backend.entity.dto.UserResponseDto;
import backend.service.UserService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Levie Wang
 * @since 2023.03.10
 */
@RequestMapping("/user")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/authenticate")
    @ResponseBody
    public UserResponseDto authenticate(@RequestBody User condition) {
        UserResponseDto userResponseDto = new UserResponseDto();

        try {
            AuthenticationResult result = userService.authenticate(condition.getUsername(), condition.getPassword());

            userResponseDto.setCode(result.getCode());
            if (result.getCode() == 200) {
                User user = result.getUser();
                userResponseDto.setUsername(user.getUsername());
                userResponseDto.setPermissionLevel(user.getPermissionLevel());
                userResponseDto.setVersion(user.getVersion());
            } else {
                userResponseDto.setMessage(result.getReport());
            }
        } catch (Exception e) {
            userResponseDto.setCode(500);
            userResponseDto.setMessage(e.getMessage());
        }

        return userResponseDto;
    }

    @PostMapping("/create")
    @ResponseBody
    public UserResponseDto createUser(@RequestBody backend.entity.User user) {
        UserResponseDto userResponseDto = new UserResponseDto();

        try {
            user = userService.saveUser(user);
            userResponseDto.setUsername(user.getUsername());
            userResponseDto.setPermissionLevel(user.getPermissionLevel());
            userResponseDto.setCode(200);
        } catch (Exception e) {
            userResponseDto.setCode(500);
            userResponseDto.setMessage(e.getMessage());
        }

        return userResponseDto;
    }

    @PostMapping("/edit")
    @ResponseBody
    public UserResponseDto updateUser(@RequestBody backend.entity.User user) {
        UserResponseDto userResponseDto = new UserResponseDto();

        try {
            user = userService.saveUser(user);
            userResponseDto.setUsername(user.getUsername());
            userResponseDto.setPermissionLevel(user.getPermissionLevel());
            userResponseDto.setCode(200);
        } catch (Exception e) {
            userResponseDto.setCode(500);
            userResponseDto.setMessage(e.getMessage());
        }

        return userResponseDto;
    }

    @GetMapping("/listAll")
    @ResponseBody
    public UserResponseDto listAllUsers() {
        UserResponseDto userResponseDto = new UserResponseDto();

        List<User> users = userService.getAllUsers();
        if (CollectionUtils.isEmpty(users)) {
            userResponseDto.setCode(500);
            userResponseDto.setMessage("找不到用户名单！");
            return userResponseDto;
        }

        userResponseDto.setResult(users);
        userResponseDto.setCode(200);
        return userResponseDto;
    }

    @GetMapping("/delete")
    @ResponseBody
    public UserResponseDto deleteUser(@RequestParam("userId") Long userId) {
        userService.deleteUser(userId);

        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setCode(200);

        return userResponseDto;
    }
}
