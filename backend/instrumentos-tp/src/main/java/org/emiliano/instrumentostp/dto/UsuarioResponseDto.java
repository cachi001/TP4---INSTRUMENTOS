package org.emiliano.instrumentostp.dto;

public record UsuarioResponseDto(
        Long id,
        String nombreUsuario,
        String rol
) {}
