package backend;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Date;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
public class VersionListener {
    @PrePersist
    @PreUpdate
    void setVersion(final Versionable entity) {
        entity.setVersion(new Date().getTime());
    }
}
