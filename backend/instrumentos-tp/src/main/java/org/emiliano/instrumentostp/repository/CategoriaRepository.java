package org.emiliano.instrumentostp.repository;


import org.emiliano.instrumentostp.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    boolean existsCategoriaByDenominacion(String denominacion);
}
