package org.emiliano.instrumentostp.service;

import com.mercadopago.client.preference.*;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import org.emiliano.instrumentostp.model.Pedido;
import org.emiliano.instrumentostp.model.PedidoDetalle;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MercadoPagoService {

    public Preference generarPago(Pedido pedido) throws MPApiException, MPException {
        List<PreferenceItemRequest> listaItemsMp = new ArrayList<>();

        for(PedidoDetalle pedidoDetalle : pedido.getPedidoDetalles()){
            PreferenceItemRequest item = PreferenceItemRequest.builder()
                    .title(pedidoDetalle.getInstrumento().getInstrumento())
                    .quantity(pedidoDetalle.getCantidad())
                    .pictureUrl(pedidoDetalle.getInstrumento().getImagen())
                    .unitPrice(pedidoDetalle.getInstrumento().getPrecio())
                    .build();

            listaItemsMp.add(item);
        }

        // Agregamos el payer con email (asumiendo que el pedido tiene el email del comprador)
        PreferencePayerRequest payer = PreferencePayerRequest.builder()
                .email("test_comprador@gmail.com")
                .build();

        PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(listaItemsMp)
                .payer(payer)
                .backUrls(PreferenceBackUrlsRequest.builder()
                        .success("http://localhost:5173/")
                        .failure("http://localhost:5173/fallo")
                        .pending("http://localhost:5173/pediente")
                        .build()
                )
                .build();

        PreferenceClient client = new PreferenceClient();

        return client.create(preferenceRequest);
    }

}
