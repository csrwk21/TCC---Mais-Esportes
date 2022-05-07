package io.github.yhugorocha.rest.controller;

import io.github.yhugorocha.domain.entity.Quadra;
import io.github.yhugorocha.domain.entity.Reserva;
import io.github.yhugorocha.rest.dto.ReservaDTO;
import io.github.yhugorocha.service.ReservaService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agenda/reserva/")
public class ReservaController {

    private ReservaService service;

    public ReservaController(ReservaService service){
        this.service = service;
    }

    @GetMapping()
    public List<Reserva> findall() {
        return service.verificaHorario();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Integer save(@RequestBody ReservaDTO reservaDto){
        Reserva reserva = service.save(reservaDto);
        return reserva.getId();
    }


}
