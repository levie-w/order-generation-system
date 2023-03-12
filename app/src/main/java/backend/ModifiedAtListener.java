package backend;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Date;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
public class ModifiedAtListener {
    @PrePersist
    @PreUpdate
    void setModifiedAt(final Modifiable entity) {
        entity.setModifiedAt(new Date());
    }
}
