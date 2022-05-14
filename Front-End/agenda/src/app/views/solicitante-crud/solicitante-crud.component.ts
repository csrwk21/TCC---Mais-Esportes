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
          console.log('data');
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  navigateToSolicitanteCreate(): void{
    this.router.navigate(['/solicitante/create'])
  }
  

}
