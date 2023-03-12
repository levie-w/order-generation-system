package backend;

import javax.persistence.PrePersist;
import java.util.Date;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
public class CreatedAtListener {
    @PrePersist
    void setCreatedAt(final Creatable entity) {
        entity.setCreatedAt(new Date());
    }
}
