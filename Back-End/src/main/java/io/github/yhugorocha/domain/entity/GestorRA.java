package io.github.yhugorocha.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_gestor_ra")
public class GestorRA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nome", length = 50)
    private String nome;

    @Column(name = "Email", length = 35)
    private String Email;

    @Column(name = "cpf", length = 15)
    private String cpf;

    @Column(name = "telefone", length = 20)
    private String telefone;

    @JoinColumn(name = "id_regiao")
    @ManyToOne
    private Regiao regiaoAdm;
}
