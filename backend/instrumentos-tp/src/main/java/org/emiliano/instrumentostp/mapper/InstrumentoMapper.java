package org.emiliano.instrumentostp.mapper;

import org.emiliano.instrumentostp.Dto.InstrumentoDto;
import org.emiliano.instrumentostp.model.Instrumento;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InstrumentoMapper {

    Instrumento instrumentoToEntity (InstrumentoDto instrumentoDto);
}
