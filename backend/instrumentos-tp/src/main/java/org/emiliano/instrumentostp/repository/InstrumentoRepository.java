package org.emiliano.instrumentostp.repository;

import org.emiliano.instrumentostp.model.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstrumentoRepository extends JpaRepository<Instrumento, Long> {
}
