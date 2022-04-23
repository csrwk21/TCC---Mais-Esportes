package io.github.yhugorocha.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "tb_quadra")
public class Quadra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "qtd_pessoas")
    private Integer qtd_pessoas;

    @Column(name = "foto")
    private Byte[] foto;

    @JoinColumn(name = "id_regiao")
    @OneToOne
    private Regiao regiao;

    @JoinColumn(name = "id_endereco")
    @OneToOne
    private Endereco endereco;

    @Column(name = "dt_registro")
    private LocalDate dt_endereco = LocalDate.now();
}
