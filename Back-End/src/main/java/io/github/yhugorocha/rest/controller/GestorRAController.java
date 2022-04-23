package io.github.yhugorocha.rest.controller;

import io.github.yhugorocha.domain.entity.GestorRA;
import io.github.yhugorocha.domain.entity.Solicitante;
import io.github.yhugorocha.domain.repositorio.GestoresRA;
import io.github.yhugorocha.rest.dto.GestorRADTO;
import io.github.yhugorocha.service.GestorRAService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/agenda/gestorra/")
public class GestorRAController {

    GestorRAService service;
    GestoresRA repository;

    public GestorRAController(GestorRAService service, GestoresRA repository){
        this.service = service;
        this.repository = repository;
    }

    @GetMapping("{id}")
    public GestorRA gestorfindById (@PathVariable Integer id){
        return repository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Gestor-RA não encontrado"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Integer save(@RequestBody GestorRADTO dto){

        GestorRA gestor = service.salvar(dto);
        return gestor.getId();
    }
}
