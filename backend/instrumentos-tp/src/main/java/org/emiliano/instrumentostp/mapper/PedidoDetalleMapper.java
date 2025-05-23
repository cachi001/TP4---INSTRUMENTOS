package org.emiliano.instrumentostp.mapper;

import org.emiliano.instrumentostp.dto.PedidoDetalleDto;
import org.emiliano.instrumentostp.model.PedidoDetalle;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PedidoDetalleMapper {

    List<PedidoDetalle> toEntity(List<PedidoDetalleDto> dtos);
}
