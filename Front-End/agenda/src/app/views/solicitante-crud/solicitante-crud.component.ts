import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SolicitanteService } from 'src/app/components/solicitante/solicitante.service';

@Component({
  selector: 'app-solicitante-crud',
  templateUrl: './solicitante-crud.component.html',
  styleUrls: ['./solicitante-crud.component.css']
})


export class SolicitanteCrudComponent implements OnInit {
  
  solicitantes: any;
  filteredSolicitantes: any[] = [];
  _filterby!: string;

  constructor(private router: Router, private service: SolicitanteService) { 

  }

  ngOnInit(): void {
    this.listSolicitantes();
  }

  listSolicitantes(): void {
    this.service.list()
      .subscribe(
        data => {
          this.solicitantes = data;
          this.filteredSolicitantes = this.solicitantes;
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

  navigateToSolicitanteCreate(): void{
    this.router.navigate(['/solicitante/create'])
  }
  

}
