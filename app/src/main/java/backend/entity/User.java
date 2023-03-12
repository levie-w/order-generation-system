package backend.entity;

import backend.*;
import backend.Versionable;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
@Data
@Entity
@Table(catalog = "business", name = "users")
@EntityListeners({VersionListener.class, CreatedAtListener.class, ModifiedAtListener.class})
@EqualsAndHashCode(exclude = {"version", "createdAt", "modifiedAt"})
public class User implements Versionable, Creatable, Modifiable, Serializable {
    private static final long serialVersionUID = -607616195023818426L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "level", nullable = false)
    private Integer level;

    @Column(name = "version", nullable = false)
    private Long version;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_at", nullable = false)
    private Date modifiedAt;
}
