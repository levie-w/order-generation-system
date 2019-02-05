package source.controller;

import source.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import source.service.UserService;

/**
 * @author Levie Wang
 * @since 2019.02.02
 */
@RequestMapping("/api")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 添加用户
     * @param user 用户信息
     */
    @PostMapping("/users")
    public void addUser(@RequestBody User user) {
        userService.saveUser(user);
    }

    /**
     * 获取用户信息
     * @param userId 用户id
     * @return User对象 用户信息，有可能是null
     */
    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.findUserById(userId);
    }
}
