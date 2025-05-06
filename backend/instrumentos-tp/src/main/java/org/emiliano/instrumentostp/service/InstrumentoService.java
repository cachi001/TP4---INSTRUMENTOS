package org.emiliano.instrumentostp.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.emiliano.instrumentostp.model.Instrumento;
import org.emiliano.instrumentostp.model.InstrumentoContainer;
import org.emiliano.instrumentostp.repository.InstrumentoRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class InstrumentoService {

    private InstrumentoRepository instrumentoRepository;

    public InstrumentoService (InstrumentoRepository instrumentoRepository){
        this.instrumentoRepository = instrumentoRepository;
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
}
