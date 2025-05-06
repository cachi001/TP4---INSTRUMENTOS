package org.emiliano.instrumentostp.service;

import org.emiliano.instrumentostp.controller.CategoriaController;
import org.emiliano.instrumentostp.model.Categoria;
import org.emiliano.instrumentostp.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public void crearCategoria(){
        List<String> categoriasString = new ArrayList<>();
        List<Categoria> categorias = new ArrayList<>();
        Collections.addAll(categoriasString, "Cuerda", "Viento", "Percusion", "Teclado", "Electronico" );

        for(String nombre : categoriasString){
            if (!categoriaRepository.existsCategoriaByDenominacion(nombre)){
                Categoria categoriaModel = new Categoria();
                categoriaModel.setDenominacion(nombre);

                categorias.add(categoriaModel);
            }
        }

        categoriaRepository.saveAll(categorias);
    }


}
