package backend.controller;

import backend.entity.User;
import backend.entity.dto.AuthenticationResult;
import backend.entity.dto.UserRequestDto;
import backend.entity.dto.UserResponseDto;
import backend.entity.dto.Validity;
import backend.service.UserService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
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
                userResponseDto.setUserId(user.getUserId());
                userResponseDto.setUsername(user.getUsername());
                userResponseDto.setLevel(user.getLevel());
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
    @Transactional
    public UserResponseDto createUser(@RequestBody UserRequestDto userRequestDto) {
        UserResponseDto userResponseDto = new UserResponseDto();

        Validity validity = userService.validateUser(userRequestDto.getOperatingUserId(), userRequestDto.getOperatingVersion());
        if (!validity.isPassed()) {
            userResponseDto.setCode(501);
            return userResponseDto;
        }

        try {
            if (userService.findUserByName(userRequestDto.getUsername()) != null) {
                userResponseDto.setCode(502);
                userResponseDto.setMessage("用户名已存在！");
                return userResponseDto;
            }

            User user = new User();
            user.setUsername(userRequestDto.getUsername());
            user.setPassword(userRequestDto.getPassword());
            user.setLevel(userRequestDto.getLevel());

            user = userService.saveUser(user);

            userResponseDto.setUserId(user.getUserId());
            userResponseDto.setUsername(user.getUsername());
            userResponseDto.setLevel(user.getLevel());
            userResponseDto.setCode(200);
        } catch (Exception e) {
            userResponseDto.setCode(500);
            userResponseDto.setMessage(e.getMessage());
        }

        return userResponseDto;
    }

    @PostMapping("/edit")
    @ResponseBody
    @Transactional
    public UserResponseDto updateUser(@RequestBody UserRequestDto userRequestDto) {
        UserResponseDto userResponseDto = new UserResponseDto();

        Validity validity = userService.validateUser(userRequestDto.getOperatingUserId(), userRequestDto.getOperatingVersion());
        if (!validity.isPassed()) {
            userResponseDto.setCode(501);
            return userResponseDto;
        }

        try {
            User user = userService.findUserById(userRequestDto.getUserId());
            if (!user.getUsername().equals(userRequestDto.getUsername())) {
                if (userService.findUserByName(userRequestDto.getUsername()) != null) {
                    userResponseDto.setCode(502);
                    userResponseDto.setMessage("用户名已存在！");
                    return userResponseDto;
                }
            }

            user.setUsername(userRequestDto.getUsername());
            user.setPassword(userRequestDto.getPassword());
            user.setLevel(userRequestDto.getLevel());

            user = userService.saveUser(user);

            userResponseDto.setUserId(user.getUserId());
            userResponseDto.setUsername(user.getUsername());
            userResponseDto.setLevel(user.getLevel());
            userResponseDto.setCode(200);
        } catch (Exception e) {
            userResponseDto.setCode(500);
            userResponseDto.setMessage(e.getMessage());
        }

        return userResponseDto;
    }

    @GetMapping("/listAll")
    @ResponseBody
    public UserResponseDto listAllUsers(@RequestParam("userId") Long userId,
                                        @RequestParam("version") Long version) {
        UserResponseDto userResponseDto = new UserResponseDto();

        Validity validity = userService.validateUser(userId, version);
        if (!validity.isPassed()) {
            userResponseDto.setCode(501);
            return userResponseDto;
        }

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
    public UserResponseDto deleteUser(@RequestParam("userId") Long userId,
                                      @RequestParam("operatingUserId") Long operatingUserId,
                                      @RequestParam("operatingVersion") Long operatingVersion) {
        UserResponseDto userResponseDto = new UserResponseDto();

        Validity validity = userService.validateUser(operatingUserId, operatingVersion);
        if (!validity.isPassed()) {
            userResponseDto.setCode(501);
            return userResponseDto;
        }

        userService.deleteUser(userId);

        userResponseDto.setCode(200);

        return userResponseDto;
    }
}
