import { CrudServiceService } from './../../../views/service-crud/crud-service.service';
import { Solicitante } from './../solicitante.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitanteService } from './../solicitante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitante-update',
  templateUrl: './solicitante-update.component.html',
  styleUrls: ['./solicitante-update.component.css']
})
export class SolicitanteUpdateComponent implements OnInit {

  constructor(private SolicitanteService:SolicitanteService, private router: Router, private cep:CrudServiceService, private route:ActivatedRoute) { }

  solicitante!: Solicitante;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.SolicitanteService.getById(id).subscribe(solicitante =>{
      this.solicitante = solicitante;
    });
  }

  consultaCep(valor: any, form: any){
    this.cep.buscar(valor).subscribe((dados)=>this.populaForm(dados, form));
  }
  populaForm(dados: any, form:any){
    form.setValue({
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      localidade: dados.localidade,
      uf: dados.uf
    })
  }

  updateSolicitante():void{

    let validacao = this.validacaoFormulario();

    if(validacao){
    this.SolicitanteService.update(this.solicitante).subscribe(
      ()=>{
        this.SolicitanteService.showMessage('Solicitante atualizado com sucesso!');
        this.router.navigate(["/solicitantes"]);
      })
    }
  }

  validacaoFormulario():boolean{
    let solicitante = this.solicitante;
    if(solicitante.nome == ''){
      this.SolicitanteService.showMessage("Nome solicitante é obrigatório",true)
      return false;
    }
    if(solicitante.cpf == ''){
      this.SolicitanteService.showMessage("CPF solicitante é obrigatório",true)
      return false;
    }
    if(solicitante.rg == ''){
      this.SolicitanteService.showMessage("RG solicitante é obrigatório",true)
      return false;
    }
    if(solicitante.telefone == ''){
      this.SolicitanteService.showMessage("Telefone solicitante é obrigatório",true)
      return false;
    }
    if(solicitante.email == ''){
      this.SolicitanteService.showMessage("E-mail solicitante é obrigatório",true)
      return false;
    }
    if(solicitante.endereco.cep == ''){
      this.SolicitanteService.showMessage("Cep solicitante é obrigatório",true)
      return false;
    }
    if(solicitante.endereco.logradouro == ''){
      this.SolicitanteService.showMessage("Logradouro solicitante é obrigatório",true)
      return false;
    }
    if(solicitante.endereco.bairro == ''){
      this.SolicitanteService.showMessage("Bairro solicitante é obrigatório",true)
      return false;
    }
    if(solicitante.endereco.localidade == ''){
      this.SolicitanteService.showMessage("Localidade solicitante é obrigatório",true)
      return false;
    }
    if(solicitante.endereco.uf == ''){
      this.SolicitanteService.showMessage("UF solicitante é obrigatório",true)
      return false;
    }

    if(!this.validaIdade(solicitante.dtnascimento)){
      this.SolicitanteService.showMessage("Solicitante tem que ser maior de idade",true)
      return false;
    }
    return true;
  }

  validaIdade(data:any):boolean{
    let ano_atual = new Date().getFullYear();
    let data_aniversario = data.split('-')[0];
    let idade = ano_atual - data_aniversario;
    console.log(idade)
    if(idade >= 18){
      return true
    }
    return false;
  }

  cancel():void{
    this.router.navigate(["/solicitantes"]);
  }
}
