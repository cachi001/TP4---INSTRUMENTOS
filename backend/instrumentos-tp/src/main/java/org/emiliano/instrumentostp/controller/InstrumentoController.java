package org.emiliano.instrumentostp.controller;

import org.emiliano.instrumentostp.model.Instrumento;
import org.emiliano.instrumentostp.repository.InstrumentoRepository;
import org.emiliano.instrumentostp.service.InstrumentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/instrumento")
public class InstrumentoController {

    private final InstrumentoService instrumentoService;
    private final InstrumentoRepository instrumentoRepository;

    public InstrumentoController (InstrumentoService instrumentoService, InstrumentoRepository instrumentoRepository) {
        this.instrumentoService = instrumentoService;
        this.instrumentoRepository = instrumentoRepository;
    }


    @PostMapping("/importar")
    public ResponseEntity<?> crearInstrumentos (){
        try{
            instrumentoService.importarInstrumentos();
            return ResponseEntity.ok("Importando Instrumentos...");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerInstrumento (@PathVariable Long id){
        try {
            Optional<Instrumento> instrumento = instrumentoRepository.findById(id);

            if (instrumento.isPresent()){
                return  ResponseEntity.ok(instrumento.get());
            } else {
                return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro el instrumento");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error"+ e.getMessage());
        }

    }
    @GetMapping("/todos")
    public ResponseEntity<?> obtenerInstrumentos (){
        try {
            List<Instrumento> instrumentos = instrumentoRepository.findAll();

            return  ResponseEntity.ok(instrumentos);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error"+ e.getMessage());
        }

    }
}
