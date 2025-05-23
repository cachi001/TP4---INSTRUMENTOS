package org.emiliano.instrumentostp.controller;

import org.emiliano.instrumentostp.dto.PedidoDto;
import org.emiliano.instrumentostp.dto.PedidoPorInstrumentoDto;
import org.emiliano.instrumentostp.dto.PedidoResponseDto;
import org.emiliano.instrumentostp.model.Pedido;
import org.emiliano.instrumentostp.repository.PedidoDetalleRepository;
import org.emiliano.instrumentostp.repository.PedidoRepository;
import org.emiliano.instrumentostp.service.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedido")
public class PedidoController {

    private final PedidoService pedidoService;
    private final PedidoDetalleRepository pedidoDetalleRepository;

    public PedidoController (PedidoService pedidoService, PedidoDetalleRepository pedidoDetalleRepository){
        this.pedidoService = pedidoService;
        this.pedidoDetalleRepository = pedidoDetalleRepository;
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

    @GetMapping("/resumen-barras")
    public List<PedidoResponseDto> obtenerResumenPedidos() {
        return pedidoService.contarPedidosAgrupadosPorMes();
    }

    @GetMapping("/resumen-pie")
    public List<PedidoPorInstrumentoDto> obtenerResumenPorInstrumento() {
        return pedidoDetalleRepository.contarPedidosAgrupadosPorInstrumento();
    }

}
