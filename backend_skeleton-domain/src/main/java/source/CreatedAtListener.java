package source;

import javax.persistence.PrePersist;
import java.util.Date;

/**
 * @author Levie Wang
 * @since 2019.02.02
 */
public class CreatedAtListener {
    @PrePersist
    void setCreatedAt(final Creatable entity) {
        entity.setCreatedAt(new Date());
    }
}
