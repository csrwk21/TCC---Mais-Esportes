import { Solicitante } from './../solicitante.model';
import { SolicitanteService } from './../solicitante.service';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CrudServiceService } from 'src/app/views/service-crud/crud-service.service';

@Component({
  selector: 'app-solicitante-create',
  templateUrl: './solicitante-create.component.html',
  styleUrls: ['./solicitante-create.component.css']
})
export class SolicitanteCreateComponent implements OnInit {
  
  solicitante: Solicitante = {
    cpf: '',
    nome: '',
    rg: '',
    dtnascimento: '',
    telefone: '',
    email: '',
    endereco:{
        cep: '',
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        complemento: '',
        numero: ''
    }
  }

  constructor(private SolicitanteService: SolicitanteService, private router: Router, private cep:CrudServiceService) { }

  ngOnInit(): void {
    
  }

  createSolicitante(): void{

    var validacao = this.validacaoFormulario();
    if(validacao){
      this.SolicitanteService.create(this.solicitante).subscribe(()=> {
        this.SolicitanteService.showMessage("Solicitante criado!")
        this.router.navigate(['/solicitantes'])
      })
    }
  }

  validacaoFormulario():boolean{
    
    let solicitante = this.solicitante;
    console.log(solicitante.dtnascimento);
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

    if(solicitante.dtnascimento == ''){
      this.SolicitanteService.showMessage("Data de nascimento é obrigatório",true)
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


  cancel(): void{
    this.router.navigate(['/solicitantes'])
  }
}
