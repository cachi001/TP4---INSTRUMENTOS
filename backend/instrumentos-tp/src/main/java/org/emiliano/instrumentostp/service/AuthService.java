package org.emiliano.instrumentostp.service;

import org.emiliano.instrumentostp.Dto.UsuarioDto;
import org.emiliano.instrumentostp.mapper.UsuarioMapper;
import org.emiliano.instrumentostp.model.Usuario;
import org.emiliano.instrumentostp.repository.UsuarioRepository;
import org.emiliano.instrumentostp.util.HashUtil;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;

    public AuthService(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
    }

    public Usuario crearUsuario(UsuarioDto usuarioDto) {
        // Encriptar la clave antes de guardar
        String claveEncriptada = HashUtil.encriptarSHA1(usuarioDto.getClave());
        usuarioDto.setClave(claveEncriptada);
        return usuarioRepository.save(usuarioMapper.toEntity(usuarioDto));
    }

}
