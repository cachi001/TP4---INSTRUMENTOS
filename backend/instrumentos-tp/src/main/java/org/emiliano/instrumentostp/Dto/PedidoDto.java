package org.emiliano.instrumentostp.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.emiliano.instrumentostp.model.PedidoDetalle;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PedidoDto {

    private Date fechaPedido;
    private BigDecimal totalPedido;

    private List<PedidoDetalle> pedidoDetalles;
}
