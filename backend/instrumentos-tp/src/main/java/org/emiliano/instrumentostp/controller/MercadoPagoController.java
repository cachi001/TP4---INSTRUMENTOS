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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/generar-pago")
    public ResponseEntity<?> crearPreferencia(@RequestBody Pedido pedido) throws MPApiException, MPException{
        Preference preferencia = mercadoPagoService.generarPago(pedido);

        String preferenceId = preferencia.getId();

        return ResponseEntity.ok(Map.of("preferenceId", preferenceId));
    }
}
