package org.emiliano.instrumentostp.controller;

import org.emiliano.instrumentostp.dto.UsuarioDto;
import org.emiliano.instrumentostp.dto.UsuarioResponseDto;
import org.emiliano.instrumentostp.enums.Rol;
import org.emiliano.instrumentostp.model.Usuario;
import org.emiliano.instrumentostp.repository.UsuarioRepository;
import org.emiliano.instrumentostp.service.AuthService;
import org.emiliano.instrumentostp.util.HashUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UsuarioRepository usuarioRepository;
    public AuthController(AuthService authService, UsuarioRepository usuarioRepository) {
        this.authService = authService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {

        System.out.println("Iniciando Login...");


        String nombreUsuario = body.get("nombreUsuario");
        String claveIngresada = body.get("clave");

        Optional<Usuario> usuarioOptional = usuarioRepository.findByNombreUsuario(nombreUsuario);

        if (usuarioOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario y/o Clave incorrectos");
        }

        Usuario usuario = usuarioOptional.get();
        String claveEncriptada = HashUtil.encriptarSHA1(claveIngresada);

        if (usuario.getClave().equals(claveEncriptada)) {
            UsuarioResponseDto respuesta = new UsuarioResponseDto(
                    usuario.getId(),
                    usuario.getNombreUsuario(),
                    usuario.getRol().toString()
            );
            return ResponseEntity.ok(respuesta);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario y/o Clave incorrectos");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        System.out.println("Iniciando Login...");

        String nombreUsuario = body.get("nombreUsuario");
        String clave = body.get("clave");
        String rol = body.get("rol");

        // Verificar que el nombre de usuario no esté tomado
        if (usuarioRepository.findByNombreUsuario(nombreUsuario).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El nombre de usuario ya está en uso.");
        }

        // Convertir y validar el rol
        Rol rolEnum;
        try {
            rolEnum = Rol.valueOf(rol.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Rol inválido. Valores válidos: Admin, Operador, Visor.");
        }

        // Crear entidad Usuario con datos sin encriptar
        UsuarioDto nuevoUsuario = new UsuarioDto();
        nuevoUsuario.setNombreUsuario(nombreUsuario);
        nuevoUsuario.setClave(clave); // se encripta en el service
        nuevoUsuario.setRol(rolEnum);

        // Guardar usuario usando el servicio
        authService.crearUsuario(nuevoUsuario);

        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado correctamente.");
    }





}
