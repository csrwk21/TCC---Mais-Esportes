import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from 'src/app/components/reserva/reserva.service';
import { CrudServiceService } from 'src/app/views/service-crud/crud-service.service';

@Component({
  selector: 'app-consulta-publica',
  templateUrl: './consulta-publica.component.html',
  styleUrls: ['./consulta-publica.component.css']
})
export class ConsultaPublicaComponent implements OnInit {

  constructor(private router: Router, private reservaService:ReservaService, private service:CrudServiceService) { }
  
  reservas: any;
  quadra: any;
  regiao:any;
  quadras:any;
  temReservas:boolean=false;
  tituloReserva = "";

  segunda_10_12: any;
  segunda_12_14: any;
  segunda_14_16: any;
  segunda_16_18: any;
  segunda_18_20: any;
  terca_10_12: any;
  terca_12_14: any;
  terca_14_16: any;
  terca_16_18: any;
  terca_18_20: any;
  quarta_10_12: any;
  quarta_12_14: any;
  quarta_14_16: any;
  quarta_16_18: any;
  quarta_18_20: any;
  quinta_10_12: any;
  quinta_12_14: any;
  quinta_14_16: any;
  quinta_16_18: any;
  quinta_18_20: any;
  sexta_10_12: any;
  sexta_12_14: any;
  sexta_14_16: any;
  sexta_16_18: any;
  sexta_18_20: any;
  
  ngOnInit(): void {
    this.exibirRegioes();
  }

  navigateToReservaCreate(): void{
    this.router.navigate(['/reserva/create'])
  }

  consultaReservas(id:number):void{
    this.reservaService.list(id)
    .subscribe(
      data => {
        this.verificaReservas(data);
      },
      error => {
        console.log(error);
      });
      
  }

  exibirRegioes():void{
    this.service.buscarRegioes().subscribe(
      data=>{ this.regiao = data;
      },
      error => {
        console.log(error);
      });
  }
  
  buscarQuadra(event:any):void{
    const id = parseInt(event.target.value.substr(3,5))
    this.exibirQuadras(id);
  }
  exibirReservas(event:any):void{
    var id = parseInt(event.target.options.selectedIndex) 
    id = id - 1;
    const idteste = this.quadras[id];
    this.consultaReservas(idteste.id);
  }

  exibirQuadras(id:number){
    this.service.buscarQuadraPorRegiao(id).subscribe(
      data=>{

        if(data.length == 0){
          this.tituloReserva = "NÃO HÁ QUADRAS CADASTRADAS";
        }else{
          this.tituloReserva = '';
        }
        this.quadras = data;

      },
      error => {
        console.log(error);
      });
  }
  
  verificaReservas(reservas:any):void{
    this.zeraVariaveis();
    if(reservas.length == 0){
      this.zeraVariaveis();
      this.temReservas = false;
      this.tituloReserva = "NÃO HÁ RESERVAS CADASTRADAS";
    }else{
      this.reservas = reservas;
      this.temReservas = true;
      this.tituloReserva = "";
      this.exibeHorarios();
    }
    
  }

  exibeHorarios():void{
    
    for (const [key, value] of Object.entries(this.reservas)) {
      if(this.reservas[key].horario.id == 1 && this.reservas[key].semana.id == 1){
        this.segunda_10_12 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 2 && this.reservas[key].semana.id == 1){
        this.segunda_12_14 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 3 && this.reservas[key].semana.id == 1){
        this.segunda_14_16 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 4 && this.reservas[key].semana.id == 1){
        this.segunda_16_18 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 5 && this.reservas[key].semana.id == 1){
        this.segunda_18_20 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 1 && this.reservas[key].semana.id == 2){
        this.terca_10_12 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 2 && this.reservas[key].semana.id == 2){
        this.terca_12_14 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 3 && this.reservas[key].semana.id == 2){
        this.terca_14_16 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 4 && this.reservas[key].semana.id == 2){
        this.terca_16_18 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 5 && this.reservas[key].semana.id == 2){
        this.terca_18_20 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 1 && this.reservas[key].semana.id == 3){
        this.quarta_10_12 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 2 && this.reservas[key].semana.id == 3){
        this.quarta_12_14 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 3 && this.reservas[key].semana.id == 3){
        this.quarta_14_16 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 4 && this.reservas[key].semana.id == 3){
        this.quarta_16_18 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 5 && this.reservas[key].semana.id == 3){
        this.quarta_18_20 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 1 && this.reservas[key].semana.id == 4){
        this.quinta_10_12 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 2 && this.reservas[key].semana.id == 4){
        this.quinta_12_14 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 3 && this.reservas[key].semana.id == 4){
        this.quinta_14_16 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 4 && this.reservas[key].semana.id == 4){
        this.quinta_16_18 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 5 && this.reservas[key].semana.id == 4){
        this.quinta_18_20 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 1 && this.reservas[key].semana.id == 5){
        this.sexta_10_12 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 2 && this.reservas[key].semana.id == 5){
        this.sexta_12_14 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 3 && this.reservas[key].semana.id == 5){
        this.sexta_14_16 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 4 && this.reservas[key].semana.id == 5){
        this.sexta_16_18 = this.reservas[key];
      }
      if(this.reservas[key].horario.id == 5 && this.reservas[key].semana.id == 5){
        this.sexta_18_20 = this.reservas[key];
      }
    }
  }

zeraVariaveis():void{

this.segunda_10_12 = null;
this.segunda_12_14 = null;
this.segunda_14_16 = null;
this.segunda_16_18 = null;
this.segunda_18_20 = null;
this.terca_10_12 = null;
this.terca_12_14 = null;
this.terca_14_16 = null;
this.terca_16_18 = null;
this.terca_18_20 = null;
this.quarta_10_12 = null;
this.quarta_12_14 = null;
this.quarta_14_16 = null;
this.quarta_16_18 = null;
this.quarta_18_20 = null;
this.quinta_10_12 = null;
this.quinta_12_14 = null;
this.quinta_14_16 = null;
this.quinta_16_18 = null;
this.quinta_18_20 = null;
this.sexta_10_12 = null;
this.sexta_12_14 = null;
this.sexta_14_16 = null;
this.sexta_16_18 = null;
this.sexta_18_20 = null;
  
}
}
