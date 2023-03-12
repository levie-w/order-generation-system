package backend.repository;

import backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "select * from users where username = ?1", nativeQuery = true)
    List<User> findByName(String username);
}
