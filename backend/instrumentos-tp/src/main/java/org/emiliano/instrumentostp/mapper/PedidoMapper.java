package org.emiliano.instrumentostp.mapper;

import org.emiliano.instrumentostp.Dto.PedidoDto;
import org.emiliano.instrumentostp.model.Pedido;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface PedidoMapper {
    Pedido pedidoToEntity(PedidoDto pedidoDto);
}
