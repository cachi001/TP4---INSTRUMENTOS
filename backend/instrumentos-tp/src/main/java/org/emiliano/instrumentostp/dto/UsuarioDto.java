package org.emiliano.instrumentostp.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.emiliano.instrumentostp.enums.Rol;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsuarioDto {
    private Long id;
    private String nombreUsuario;
    private String clave;
    private Rol rol;

}
