package org.emiliano.instrumentostp.repository;

import org.emiliano.instrumentostp.dto.PedidoResponseDto;
import org.emiliano.instrumentostp.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Query("SELECT FUNCTION('MONTH', p.fechaPedido), FUNCTION('YEAR', p.fechaPedido), COUNT(p) " +
            "FROM Pedido p " +
            "GROUP BY FUNCTION('MONTH', p.fechaPedido), FUNCTION('YEAR', p.fechaPedido) " +
            "ORDER BY FUNCTION('YEAR', p.fechaPedido), FUNCTION('MONTH', p.fechaPedido)")
    List<Object[]> contarPedidosAgrupadosPorMesRaw();

    List<Pedido> findByFechaPedidoBetween(LocalDateTime desde, LocalDateTime hasta);

}
