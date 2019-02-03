package source;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Date;

/**
 * @author Levie Wang
 * @since 2019.02.02
 */
public class ModifiedAtListener {
    @PrePersist
    @PreUpdate
    void setModifiedAt(final Modifiable entity) {
        entity.setModifiedAt(new Date());
    }
}
