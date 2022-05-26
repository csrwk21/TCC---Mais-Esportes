package io.github.yhugorocha.rest.controller;

import io.github.yhugorocha.domain.entity.Usuario;
import io.github.yhugorocha.service.impl.UsuarioServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/agenda/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioServiceImpl usuarioService;
    private final PasswordEncoder encoder;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario salvar(@RequestBody @Valid Usuario usuario){
        String senhaCript = encoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCript);
        return usuarioService.salvar(usuario);
    }
}
