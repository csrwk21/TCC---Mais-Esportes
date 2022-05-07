import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/views/service-crud/crud-service.service';


@Component({
  selector: 'app-gestor-create',
  templateUrl: './gestor-create.component.html',
  styleUrls: ['./gestor-create.component.css']
})
export class GestorCreateComponent implements OnInit {

  regioes: any;
  constructor(private service:CrudServiceService) { }

  ngOnInit(): void {
    this.exibirRegioes();
  }

  exibirRegioes():void{
    this.service.buscarRegioes().subscribe(
      data=>{ this.regioes = data;
      },
      error => {
        console.log(error);
      });
  }

}
