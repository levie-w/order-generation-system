package backend;

import java.util.Date;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
public interface Modifiable {
    void setModifiedAt(final Date date);
}
