import { GestorRa } from './../gestorra.model';
import { GestorService } from './../gestor.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/views/service-crud/crud-service.service';


@Component({
  selector: 'app-gestor-create',
  templateUrl: './gestor-create.component.html',
  styleUrls: ['./gestor-create.component.css']
})
export class GestorCreateComponent implements OnInit {

  regiao: any;
  gestor:GestorRa= {
    nome: '',
    cpf: '',
    email:'',
    telefone:'',
    regiao: null
  }

  constructor(private service:CrudServiceService, private router:Router, private gestorService: GestorService) { }

  ngOnInit(): void {
    this.exibirRegioes();
  }

  exibirRegioes():void{
    this.service.buscarRegioes().subscribe(
      data=>{ this.regiao = data;
      },
      error => {
        console.log(error);
      });
  }

  createGestor():void{
    this.gestor.regiao = this.gestor.regiao.id;
    console.log(this.gestor);
    this.gestorService.create(this.gestor).subscribe(()=>{
      this.gestorService.showMessage("Gestor criado com Sucesso!");
      this.router.navigate(['/gestores']);
    })
  }
  cancel():void{
  this.router.navigate(['/gestores'])
  }

}
