package org.emiliano.instrumentostp.controller;

import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import org.emiliano.instrumentostp.model.Pedido;
import org.emiliano.instrumentostp.model.PedidoDetalle;
import org.emiliano.instrumentostp.service.MercadoPagoService;
import org.emiliano.instrumentostp.service.PedidoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mp")
public class MercadoPagoController {

    private final MercadoPagoService mercadoPagoService;

    public MercadoPagoController(MercadoPagoService mercadoPagoService) {
        this.mercadoPagoService = mercadoPagoService;
    }

    @PostMapping("/crear-preferencia")
    public ResponseEntity<?> crearPreferencia(@RequestBody Pedido pedido) throws MPApiException, MPException{
        Preference preferencia = mercadoPagoService.crearPreferencia(pedido);

        String preferenceId = preferencia.getId();

        return ResponseEntity.ok(Map.of("preferenceId", preferenceId));
    }
    @PostMapping("/webhook")
    public ResponseEntity<String> recibirWebhook(@RequestBody Map<String, Object> body) {
        try {
            System.out.println("Webhook recibido: " + body);
            String type = (String) body.get("type");
            Map<String, Object> data = (Map<String, Object>) body.get("data");

            if (type != null && type.equals("payment") && data != null && data.get("id") != null) {
                Long paymentId = Long.valueOf(data.get("id").toString());
                System.out.println("Procesando pago con ID: " + paymentId);
                mercadoPagoService.procesarPago(paymentId);
            } else {
                System.out.println("Webhook recibido sin 'type=payment' o sin 'data.id'");
            }

            return ResponseEntity.ok("Webhook procesado correctamente");

        } catch (Exception e) {
            System.out.println("Error al procesar el webhook");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el webhook");
        }
    }

    @GetMapping("/rechazar/{id}")
    public RedirectView rechazarPedido(
            @PathVariable Long id,
            @RequestParam Map<String, String> params
    ) {
        System.out.println("Pago rechazado para el pedido ID: " + id);
        System.out.println("Parámetros recibidos: " + params);

        mercadoPagoService.rechazarPedido(id);
        return new RedirectView("http://localhost:5173/rechazado");
    }

    @GetMapping("/aprobar/{id}")
    public RedirectView aprobarPedido(
            @PathVariable Long id,
            @RequestParam Map<String, String> params
    ) {
        System.out.println("Pago aprobado para el pedido ID: " + id);
        System.out.println("Parámetros recibidos: " + params);

        return new RedirectView("http://localhost:5173/aprobado");
    }
}


