import { Observable } from 'rxjs';
import { ReservaService } from './../reserva.service';
import { Router } from '@angular/router';
import { NovaReserva } from './../novaReserva.model';
import { CrudServiceService } from './../../../views/service-crud/crud-service.service';
import { Component, OnInit } from '@angular/core';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

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
    console.log(this.novaReserva);
    this.serviceReserva.fazerReserva(this.novaReserva).subscribe(() =>{
     this.serviceReserva.showMessage("Reserva cadastrada!")
      this.router.navigate(['/'])
    })
  }

  buscarQuadra(event:any):void{
    const id = parseInt(event.target.value[3])
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
}
