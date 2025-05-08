package org.emiliano.instrumentostp.repository;

import org.emiliano.instrumentostp.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
