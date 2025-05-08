package org.emiliano.instrumentostp.service;

import org.emiliano.instrumentostp.Dto.PedidoDto;
import org.emiliano.instrumentostp.mapper.PedidoMapper;
import org.emiliano.instrumentostp.model.Pedido;
import org.emiliano.instrumentostp.repository.PedidoRepository;
import org.springframework.stereotype.Service;

@Service
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final PedidoMapper pedidoMapper;

    public PedidoService(PedidoRepository pedidoRepository, PedidoMapper pedidoMapper) {
        this.pedidoRepository = pedidoRepository;
        this.pedidoMapper = pedidoMapper;
    }

    public Pedido crearPedido(PedidoDto pedidoDto) {

        Pedido pedido = pedidoMapper.pedidoToEntity(pedidoDto);

        return pedidoRepository.save(pedido);

    }

}
