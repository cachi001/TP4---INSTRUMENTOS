package org.emiliano.instrumentostp.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.emiliano.instrumentostp.model.Instrumento;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDetalleDto {
    private int cantidad;

    private Instrumento instrumento;
}
