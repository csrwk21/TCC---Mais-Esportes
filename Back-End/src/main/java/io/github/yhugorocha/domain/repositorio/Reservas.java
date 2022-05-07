package io.github.yhugorocha.domain.repositorio;

import io.github.yhugorocha.domain.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Reservas extends JpaRepository<Reserva, Integer> {

    @Query(value = " SELECT r FROM Reserva r where r.id = :solicitante ")
    List<Reserva> verificaHorario(@Param("solicitante") Integer solicitante);
}
