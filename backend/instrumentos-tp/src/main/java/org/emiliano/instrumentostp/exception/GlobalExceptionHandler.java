package org.emiliano.instrumentostp.exception;

import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(final RuntimeException e) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Ocurrió un error en tiempo de Ejecucion: " + e.getMessage());
    }

    @ExceptionHandler(MPApiException.class)
    public ResponseEntity<String> handleMPApiException(final MPApiException e) {
        return ResponseEntity
                .status(HttpStatus.BAD_GATEWAY)
                .body("Error en la API de Mercado Pago: " + e.getMessage());
    }

    @ExceptionHandler(MPException.class)
    public ResponseEntity<String> handleMPException(final MPException e) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error interno al usar Mercado Pago: " + e.getMessage());
    }
}
