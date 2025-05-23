package org.emiliano.instrumentostp.repository;

import org.emiliano.instrumentostp.dto.PedidoPorInstrumentoDto;
import org.emiliano.instrumentostp.model.PedidoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalle, Long> {

    @Query("SELECT new org.emiliano.instrumentostp.dto.PedidoPorInstrumentoDto(i.instrumento, SUM(pd.cantidad)) " +
            "FROM PedidoDetalle pd JOIN pd.instrumento i " +
            "GROUP BY i.instrumento ORDER BY SUM(pd.cantidad) DESC")
    List<PedidoPorInstrumentoDto> contarPedidosAgrupadosPorInstrumento();

}
