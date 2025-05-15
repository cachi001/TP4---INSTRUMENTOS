package org.emiliano.instrumentostp.service;

import org.emiliano.instrumentostp.Dto.PedidoDto;
import org.emiliano.instrumentostp.mapper.PedidoDetalleMapper;
import org.emiliano.instrumentostp.mapper.PedidoMapper;
import org.emiliano.instrumentostp.model.Pedido;
import org.emiliano.instrumentostp.model.PedidoDetalle;
import org.emiliano.instrumentostp.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final PedidoMapper pedidoMapper;
    private final PedidoDetalleMapper pedidoDetalleMapper;

    public PedidoService(PedidoRepository pedidoRepository, PedidoMapper pedidoMapper, PedidoDetalleMapper pedidoDetalleMapper) {
        this.pedidoRepository = pedidoRepository;
        this.pedidoMapper = pedidoMapper;
        this.pedidoDetalleMapper = pedidoDetalleMapper;
    }

    public Pedido crearPedido(PedidoDto pedidoDto) {

        List<PedidoDetalle> listaPedidoDetalles = pedidoDetalleMapper.toEntity(pedidoDto.getPedidoDetalles()) ;

        Pedido pedido = pedidoMapper.pedidoToEntity(pedidoDto);

        pedido.setPedidoDetalles(listaPedidoDetalles);
        pedido.setTotalPedido(calcularTotalPedido(pedido));
        pedido.setFechaPedido(LocalDateTime.now());

        return pedidoRepository.save(pedido);

    }

    public BigDecimal calcularTotalPedido (Pedido pedido){

        BigDecimal total = BigDecimal.ZERO;

        for (PedidoDetalle pedidoDetalle : pedido.getPedidoDetalles()){

            BigDecimal cantidad = BigDecimal.valueOf(pedidoDetalle.getCantidad());
            BigDecimal subtotal = cantidad.multiply(pedidoDetalle.getInstrumento().getPrecio());

            total = total.add(subtotal);

        }

        return total;

    }

}
