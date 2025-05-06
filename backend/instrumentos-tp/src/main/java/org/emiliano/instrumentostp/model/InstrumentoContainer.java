package org.emiliano.instrumentostp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstrumentoContainer {

    private List<Instrumento> instrumentos;
}
