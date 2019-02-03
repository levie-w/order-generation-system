package source.repository;

import source.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Levie Wang
 * @since 2019.02.02
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
