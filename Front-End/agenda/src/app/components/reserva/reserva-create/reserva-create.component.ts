import { Observable } from 'rxjs';
import { ReservaService } from './../reserva.service';
import { Router } from '@angular/router';
import { NovaReserva } from './../novaReserva.model';
import { CrudServiceService } from './../../../views/service-crud/crud-service.service';
import { Component, OnInit } from '@angular/core';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Email } from '../Email.model';

@Component({
  selector: 'app-reserva-create',
  templateUrl: './reserva-create.component.html',
  styleUrls: ['./reserva-create.component.css']
})
export class ReservaCreateComponent implements OnInit {

  constructor(private service:CrudServiceService, private router: Router, private serviceReserva:ReservaService) { }

  filteredSolicitantes!: any;
  _filterby!: string;
  quadras:any;
  regioes:any;
  semanas:any;
  solicitantes:any;
  horarios:any;
  novaReserva: NovaReserva = {
    solicitante:'',
    quadra: '',
    dtInicio:'',
    dtFinal: '',
    semana:'',
    horario:''
}
  resposta:any;

email:any = {
    "owner_ref": "admin",
    "email_from": "yhugorocha@gmail.com",
    "email_to": "",
    "subject": "Reserva Efetivada",
    "texto": ""
}


    ngOnInit(): void {
      this.exibirRegioes();
      this.exibirSemana();
      this.exibirHorario();
      this.exibirSolicitantes();
  }
  
    exibirRegioes():void{
      this.service.buscarRegioes().subscribe(
        data=>{ this.regioes = data;
          console.log(data)
        },
        error => {
          console.log(error);
        });
    }
    exibirSemana():void{
      this.service.buscarSemana().subscribe(
        data=>{ this.semanas = data;
          console.log(data)
        },
        error => {
          console.log(error);
        });
    }
    exibirHorario():void{
      this.service.buscarHorarios().subscribe(
        data=>{ this.horarios = data;
          console.log(data)
        },
        error => {
          console.log(error);
        });
    }
    exibirSolicitantes():void{
      this.service.buscarSolicitante().subscribe(
        data=>{ this.solicitantes = data;
          this.filteredSolicitantes = this.solicitantes;
          console.log(this.filteredSolicitantes)
        },
        error => {
          console.log(error);
        });
    }
  
    adcSolicitante(idSol:any){
      this.novaReserva.solicitante = idSol;
    }
  
  fazerReserva():void{
    if(this.validacaoFormulario()){
    this.serviceReserva.fazerReserva(this.novaReserva).subscribe(
      resp => {
          this.resposta = resp;
          this.enviarEmail();
      })
    }
  }

  enviarEmail():void{
 
    let quadra = this.resposta.quadra.nome;
    let solicitante = this.resposta.solicitante.nome;
    let semana = this.resposta.semana.dia;
    let horario = this.resposta.horario.hora;
    let emailSolicitante = this.resposta.solicitante.email;

    let msg = 'Olá, Senhor(a) '+solicitante+'.\n\ \n\ Sua reserva foi cadastrada com sucesso! \n\ \n\ Quadra: '+quadra+'. \n\ Dia da semana:'+semana+'. \n\ Horário: '+horario+'.\n\ \n\ \n\ E-mail enviado automaticamente, não é necessario responder!'

    this.email.email_to = emailSolicitante;
    this.email.texto = msg;
    this.serviceReserva.enviarEmail(this.email).subscribe(() =>{
     this.serviceReserva.showMessage("Reserva cadastrada!")
     this.router.navigate(['/'])
    })
  }
  

  buscarQuadra(event:any):void{
    const id = parseInt(event.target.value.substr(3,5))
    this.exibirQuadras(id);
  }

  exibirQuadras(id:number):void{
    this.service.buscarQuadraPorRegiao(id).subscribe(
      data=>{ this.quadras = data;
        console.log(data)
      },
      error => {
        console.log(error);
      });
  }

  set filter(value:string){
    this._filterby = value;
    this.filteredSolicitantes = this.solicitantes.filter((sol:any)=>sol.nome.toLocaleLowerCase().indexOf(this._filterby.toLocaleLowerCase()) > -1);

  }
  get filter(){
    return this._filterby
  }

  cancel():void{
    this.router.navigate(['/'])
  }

  validacaoFormulario():boolean{
    
    let novaReserva = this.novaReserva;
  
    if(novaReserva.solicitante == ''){
      this.serviceReserva.showMessage("Solicitante é obrigatório",true)
      return false;
    }
 
    if(novaReserva.quadra == ''){
      this.serviceReserva.showMessage("Quadra é obrigatório",true)
      return false;
    }
    if(novaReserva.dtInicio == ''){
      this.serviceReserva.showMessage("Data Inicio é obrigatório",true)
      return false;
    }
  
    if(novaReserva.dtFinal == ''){
      this.serviceReserva.showMessage("Data Final é obrigatório",true)
      return false;
    }
    if(novaReserva.semana == ''){
      this.serviceReserva.showMessage("Dia da semana é obrigatório",true)
      return false;
    }
    if(novaReserva.horario == ''){
      this.serviceReserva.showMessage("Horário é obrigatório",true)
      return false;
    }
  
    return true;
  }
}
