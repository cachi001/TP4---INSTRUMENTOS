package org.emiliano.instrumentostp.model;

import jakarta.persistence.*;
import lombok.*;
import org.emiliano.instrumentostp.enums.Rol;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombreUsuario;

    @Column(nullable = false)
    private String clave;

    @Enumerated(EnumType.STRING)
    private Rol rol;
}
