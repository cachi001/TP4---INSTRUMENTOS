package org.emiliano.instrumentostp.controller;

import org.emiliano.instrumentostp.Dto.InstrumentoDto;
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

    @PostMapping("/crear")
    public ResponseEntity<?> crearInstrumento (@RequestBody InstrumentoDto instrumentoDto){
        try{
            Instrumento instrumento = instrumentoService.crearInstrumento(instrumentoDto);
            return ResponseEntity.ok(instrumento);
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al intentar traer instrumentos"+ e.getMessage());
        }

    }

    @PutMapping("/modificar")
    public ResponseEntity<?> modificarInstrumento(@RequestBody Instrumento instrumento) {
        try {
            // Buscamos el instrumento por su ID, que ahora viene dentro del objeto
            Optional<Instrumento> instrumentoExistente = instrumentoRepository.findById(instrumento.getId());

            if (instrumentoExistente.isPresent()) {
                // Modificamos el instrumento con los datos proporcionados
                Instrumento instrumentoActualizado = instrumentoService.modificar(instrumento);
                return ResponseEntity.ok(instrumentoActualizado);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el instrumento con ID " + instrumento.getId());
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al modificar instrumento: " + e.getMessage());
        }
    }



    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarInstrumento(@PathVariable Long id){
        try {
            instrumentoService.eliminarInstrumento(id);
            return  ResponseEntity.ok().body("INSTRUMENTO CON ID "+id+ " ELIMINADA");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al intentar eliminar"+ e.getMessage());
        }
    }
}
