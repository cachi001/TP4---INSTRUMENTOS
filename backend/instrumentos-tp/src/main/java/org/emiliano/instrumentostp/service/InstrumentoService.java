package org.emiliano.instrumentostp.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.emiliano.instrumentostp.Dto.InstrumentoDto;
import org.emiliano.instrumentostp.mapper.InstrumentoMapper;
import org.emiliano.instrumentostp.model.Categoria;
import org.emiliano.instrumentostp.model.Instrumento;
import org.emiliano.instrumentostp.model.InstrumentoContainer;
import org.emiliano.instrumentostp.repository.CategoriaRepository;
import org.emiliano.instrumentostp.repository.InstrumentoRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;

@Service
public class InstrumentoService {

    private final InstrumentoMapper instrumentoMapper;
    private final InstrumentoRepository instrumentoRepository;
    private final CategoriaRepository categoriaRepository;

    public InstrumentoService (InstrumentoRepository instrumentoRepository, InstrumentoMapper instrumentoMapper, CategoriaRepository categoriaRepository){
        this.instrumentoRepository = instrumentoRepository;
        this.instrumentoMapper = instrumentoMapper;
        this.categoriaRepository = categoriaRepository;
    }

    public void importarInstrumentos(){
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = new ClassPathResource("data/instrumentos.json").getInputStream();

            InstrumentoContainer container = objectMapper.readValue(inputStream, InstrumentoContainer.class);

            List<Instrumento> instrumentos = container.getInstrumentos();

            instrumentoRepository.saveAll(instrumentos);
        } catch (Exception e) {
            System.out.println("Error importando Instrumentos: "+ e.getMessage());
        }
    }

    public Instrumento crearInstrumento(InstrumentoDto instrumentoDto){

        Long idCategoria = instrumentoDto.getCategoria().getId();
        Categoria categoria = categoriaRepository.findById(idCategoria).orElseThrow(() -> new RuntimeException("Categoria no encontrada"));

        Instrumento instrumento = instrumentoMapper.instrumentoToEntity(instrumentoDto);

        instrumento.setCategoria(categoria);


        return instrumentoRepository.save(instrumento);
    }

    public Instrumento modificar(Instrumento instrumento) {
        // Buscamos el instrumento existente por su ID
        Instrumento instrumentoExistente = instrumentoRepository.findById(instrumento.getId())
                .orElseThrow(() -> new RuntimeException("Instrumento no encontrado con ID: " + instrumento.getId()));

        // Modificamos los campos necesarios
        instrumentoExistente.setInstrumento(instrumento.getInstrumento());
        instrumentoExistente.setMarca(instrumento.getMarca());
        instrumentoExistente.setModelo(instrumento.getModelo());
        instrumentoExistente.setImagen(instrumento.getImagen());
        instrumentoExistente.setPrecio(instrumento.getPrecio());
        instrumentoExistente.setCantidadVendida(instrumento.getCantidadVendida());
        instrumentoExistente.setDescripcion(instrumento.getDescripcion());
        instrumentoExistente.setCostoEnvio(instrumento.getCostoEnvio());
        instrumentoExistente.setCategoria(instrumento.getCategoria());

        // Guardamos el instrumento actualizado
        return instrumentoRepository.save(instrumentoExistente);
    }


    public void eliminarInstrumento (Long id){
        try{
            instrumentoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
