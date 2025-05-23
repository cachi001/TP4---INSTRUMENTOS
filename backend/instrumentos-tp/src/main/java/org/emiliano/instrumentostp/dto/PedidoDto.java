package org.emiliano.instrumentostp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PedidoDto {
    
    private List<PedidoDetalleDto> pedidoDetalles;
}
