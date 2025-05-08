package org.emiliano.instrumentostp.controller;

import org.emiliano.instrumentostp.Dto.PedidoDto;
import org.emiliano.instrumentostp.model.Pedido;
import org.emiliano.instrumentostp.service.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedido")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController (PedidoService pedidoService){
        this.pedidoService = pedidoService;
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearPedido(@RequestBody PedidoDto pedidoDto) {
        try {
            Pedido pedido = pedidoService.crearPedido(pedidoDto);
            return ResponseEntity.ok(pedido);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al crear el pedido.");
        }
    }



}
