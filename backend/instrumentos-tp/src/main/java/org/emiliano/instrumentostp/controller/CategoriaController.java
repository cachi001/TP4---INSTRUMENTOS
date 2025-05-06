package org.emiliano.instrumentostp.controller;

import org.emiliano.instrumentostp.model.Categoria;
import org.emiliano.instrumentostp.repository.CategoriaRepository;
import org.emiliano.instrumentostp.service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    private final CategoriaRepository categoriaRepository;
    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaRepository categoriaRepository, CategoriaService categoriaService){
        this.categoriaRepository = categoriaRepository;
        this.categoriaService = categoriaService;
    }

    @PostMapping("/crear")
    public ResponseEntity<?> crearCategoria(){
        try {
            categoriaService.crearCategoria();
            return ResponseEntity.ok().build();
        } catch (Exception e){
            return ResponseEntity.internalServerError().body("Error al crear categoria" + e.getMessage());
        }
    }

    @GetMapping("/todos")
    public ResponseEntity<?> obtenerInstrumentos (){
        try {
            List<Categoria> categorias = categoriaRepository.findAll();

            return  ResponseEntity.ok(categorias);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al intentar traer categorias"+ e.getMessage());
        }

    }


}
