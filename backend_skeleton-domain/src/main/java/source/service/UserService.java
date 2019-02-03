package source.service;

import source.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import source.repository.UserRepository;

/**
 * @author Levie Wang
 * @since 2019.02.02
 */
@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
}
