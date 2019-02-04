package source.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import source.Creatable;
import source.CreatedAtListener;
import source.Modifiable;
import source.ModifiedAtListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author Levie Wang
 * @since 2019.02.02
 */
@Data
@Entity
@Table(name = "users")
@EntityListeners({CreatedAtListener.class, ModifiedAtListener.class })
@EqualsAndHashCode(exclude = {"createdAt", "modifiedAt"})
public class User implements Creatable, Modifiable, Serializable {
    private static final long serialVersionUID = -3226687162767205339L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdAt", nullable = false, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modifiedAt", nullable = false)
    private Date modifiedAt;

    @Override
    public void setCreatedAt(Date date) {
        this.createdAt = date;
    }

    @Override
    public void setModifiedAt(Date date) {
        this.modifiedAt = date;
    }
}
