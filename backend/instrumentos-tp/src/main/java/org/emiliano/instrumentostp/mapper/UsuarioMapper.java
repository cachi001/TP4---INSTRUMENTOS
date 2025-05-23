package org.emiliano.instrumentostp.mapper;

import org.emiliano.instrumentostp.dto.UsuarioDto;
import org.emiliano.instrumentostp.model.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {
    Usuario toEntity (UsuarioDto usuarioDto);
}
