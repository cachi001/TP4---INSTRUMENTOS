package org.emiliano.instrumentostp.service;

import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.*;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.preference.Preference;
import org.emiliano.instrumentostp.enums.EstadoPedido;
import org.emiliano.instrumentostp.model.Pedido;
import org.emiliano.instrumentostp.model.PedidoDetalle;
import org.emiliano.instrumentostp.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MercadoPagoService {
    @Value("${url.ngrok}")
    private String urlNgrok;
    private PedidoRepository pedidoRepository;

    public MercadoPagoService (PedidoRepository pedidoRepository){
        this.pedidoRepository = pedidoRepository;
    }


    public Preference crearPreferencia(Pedido pedido) throws MPApiException, MPException {
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
        PreferenceItemRequest item = PreferenceItemRequest.builder()
                .title("Costo Envio")
                .quantity(1)
                //.unitPrice()
                .build();

        PreferenceBackUrlsRequest url = PreferenceBackUrlsRequest.builder()
                .success(urlNgrok + "/mp/aprobar/" + pedido.getId())
                .failure(urlNgrok + "/mp/rechazar/" + pedido.getId())
                .build();

        PreferencePayerRequest payer = PreferencePayerRequest.builder()
                .email("test_comprador@gmail.com")
                .name("testUser")
                .build();

        PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(listaItemsMp)
                .payer(payer)
                .backUrls(url)
                .notificationUrl(urlNgrok + "/mp/webhook")
                .externalReference(String.valueOf(pedido.getId()))
                .build();

        PreferenceClient client = new PreferenceClient();

        return client.create(preferenceRequest);
    }

    public void procesarPago(Long paymentId) throws MPApiException, MPException {
            System.out.println("🔄 Iniciando proceso de verificación del pago: " + paymentId);

            PaymentClient client = new PaymentClient();
            Payment payment = client.get(paymentId);

            String status = payment.getStatus();
            String externalReference = payment.getExternalReference();

            System.out.println("Estado del pago: " + status);
            System.out.println("Referencia externa: " + externalReference);

            if (externalReference == null) return;

            Long pedidoId = Long.parseLong(externalReference);

            Pedido pedido = pedidoRepository.findById(pedidoId)
                    .orElseThrow(() -> new RuntimeException("Pedido no encontrado con ID: " + pedidoId));

            if ("approved".equals(status)) {
                pedido.setEstadoPedido(EstadoPedido.APROBADO);
            } else if ("rejected".equals(status)) {
                pedido.setEstadoPedido(EstadoPedido.RECHAZADO);
            }

            pedidoRepository.save(pedido);
            System.out.println("Pedido actualizado y guardado");


    }

    public void rechazarPedido(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        pedido.setEstadoPedido(EstadoPedido.RECHAZADO);
        pedidoRepository.save(pedido);
    }
}
