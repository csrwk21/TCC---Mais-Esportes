package io.github.yhugorocha.service.impl;

import io.github.yhugorocha.domain.entity.*;
import io.github.yhugorocha.domain.repositorio.*;
import io.github.yhugorocha.exception.RegraNegocioException;
import io.github.yhugorocha.rest.dto.InformacoesReservaDTO;
import io.github.yhugorocha.rest.dto.ReservaDTO;
import io.github.yhugorocha.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservaServiceImpl implements ReservaService {

    @Autowired
    Reservas reservas;
    @Autowired
    Quadras quadras;
    @Autowired
    Solicitantes solicitantes;
    @Autowired
    Semanas semanas;
    @Autowired
    Horarios horarios;

    @Override
    @Transactional
    public Reserva save(ReservaDTO reservaDto) {

        Reserva reserva = new Reserva();

        Solicitante solicitante = solicitantes.findById(reservaDto.getSolicitante())
                .orElseThrow(()-> new RegraNegocioException("Solicitante não encontrado"));

        Quadra quadra = quadras.findById(reservaDto.getQuadra())
                .orElseThrow(()-> new RegraNegocioException("Quadra não encontrada"));

        Semana semana = semanas.findById(reservaDto.getSemana())
                .orElseThrow(()-> new RegraNegocioException("Dia da semana não encontrada"));

        Horario horario = horarios.findById(reservaDto.getSemana())
                .orElseThrow(()-> new RegraNegocioException("Horario não encontrada"));

        reserva.setSolicitante(solicitante);
        reserva.setQuadra(quadra);
        reserva.setDtInicio(reservaDto.getDt_inicio());
        reserva.setDtFinal(reservaDto.getDt_final());
        reserva.setDtRegistro(LocalDate.now());
        reserva.setSemana(semana);
        reserva.setHorario(horario);

        reservas.save(reserva);

        return reserva;
    }

    public List<Reserva> obterReservasPorQuadra(Integer idQuadra){

        List<Reserva> reservas = this.reservas.reservaPorQuadra(idQuadra);

        return reservas;

    }

    @Override
    public InformacoesReservaDTO obterDadosReserva(Integer id) {

        return reservas.findById(id)
                .map(r -> converter(r))
                .orElseThrow(() -> new RegraNegocioException("Reserva não encontrada"));
    }

    public List<Reserva> findAll(){
        return reservas.findAll();
    }

    private InformacoesReservaDTO converter(Reserva reserva){
        return InformacoesReservaDTO.builder()
                .codigo(reserva.getId())
                .nomeSolicitante(reserva.getSolicitante().getNome())
                .cpf(reserva.getSolicitante().getCpf())
                .email(reserva.getSolicitante().getEmail())
                .telefone(reserva.getSolicitante().getTelefone())
                .nomeQuadra(reserva.getQuadra().getNome())
                .enderecoQuadra(reserva.getQuadra().getEndereco())
                .diaSemana(reserva.getSemana().getDia())
                .horario(reserva.getHorario().getHora()).build();
    }
}
