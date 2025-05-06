package org.emiliano.instrumentostp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Instrumento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String instrumento;

    @Column(nullable = false)
    private String marca;

    @Column(nullable = false)
    private String modelo;

    @Column(nullable = false)
    private String imagen;

    @Column(nullable = false)
    private BigDecimal precio;

    @Column(nullable = false)
    private String costoEnvio;

    @Column(nullable = false)
    private Integer cantidadVendida;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;
}
