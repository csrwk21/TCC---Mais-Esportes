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
      this.SolicitanteService.create(this.solicitante).subscribe(()=> {
        this.SolicitanteService.showMessage("Solicitante criado!")
        this.router.navigate(['/solicitantes'])
      })
    
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
