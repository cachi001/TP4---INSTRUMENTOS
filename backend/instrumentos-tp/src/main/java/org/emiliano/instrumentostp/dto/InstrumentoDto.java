package org.emiliano.instrumentostp.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.emiliano.instrumentostp.model.Categoria;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InstrumentoDto {
    private String instrumento;

    private String marca;

    private String modelo;

    private String imagen;

    private BigDecimal precio;

    private String costoEnvio;

    private Integer cantidadVendida;

    private String descripcion;

    private Categoria categoria;
}
