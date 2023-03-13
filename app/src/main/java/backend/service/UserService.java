package backend.service;

import backend.entity.User;
import backend.entity.dto.AuthenticationResult;
import backend.entity.dto.Validity;
import backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public AuthenticationResult authenticate(String username, String password) {
        AuthenticationResult result = new AuthenticationResult();

        User user = this.findUserByName(username);
        if (user == null) {
            result.setCode(500);
            result.setReport("用户不存在！");
            return result;
        }

        if (!user.getPassword().equals(password)) {
            result.setCode(500);
            result.setReport("密码不正确！");
            return result;
        }

        result.setCode(200);
        result.setUser(user);
        return result;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public User findUserByName(String username) {
        List<User> users = userRepository.findByName(username);
        if (CollectionUtils.isNotEmpty(users)) {
            return users.get(0);
        }
        return null;
    }

    public User findUserById(Long userId) {
        Optional<User> result = userRepository.findById(userId);
        return result.orElse(null);
    }

    public Validity validateUser(Long userId, Long version) {
        Validity validity = new Validity();

        User user = this.findUserById(userId);
        if (user == null) {
            validity.setPassed(false);
            return validity;
        }

        if (!user.getVersion().equals(version)) {
            validity.setPassed(false);
            return validity;
        }

        validity.setPassed(true);
        validity.setLevel(user.getLevel());
        return validity;
    }
}
