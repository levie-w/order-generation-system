package backend.repository;

import backend.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query(value = "select * from clients order by rand() limit ?1", nativeQuery = true)
    List<Client> getRandomClients(int num);

    @Query(value = "select * from clients where client_type in ?2 order by rand() limit ?1", nativeQuery = true)
    List<Client> getRandomClients(int num, List<String> orderTypes);

    @Transactional
    @Modifying
    @Query(value = "truncate table clients",nativeQuery = true)
    void truncateTable();
}
