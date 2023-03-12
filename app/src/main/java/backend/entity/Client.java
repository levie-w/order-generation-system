package backend.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import backend.Creatable;
import backend.CreatedAtListener;
import backend.Modifiable;
import backend.ModifiedAtListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author Levie Wang
 * @since 2023.02.18
 */
@Data
@Entity
@Table(catalog = "business", name = "clients")
@EntityListeners({CreatedAtListener.class, ModifiedAtListener.class})
@EqualsAndHashCode(exclude = {"createdAt", "modifiedAt"})
public class Client implements Creatable, Modifiable, Serializable {
    private static final long serialVersionUID = -3226687162767205339L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private Long clientId;

    @Column(name = "client_code", nullable = false)
    private String clientCode;

    @Column(name = "client_name", nullable = false)
    private String clientName;

    @Column(name = "client_type", nullable = false)
    private String clientType;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_at", nullable = false)
    private Date modifiedAt;

}
