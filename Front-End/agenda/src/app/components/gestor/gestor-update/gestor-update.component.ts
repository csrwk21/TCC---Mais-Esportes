import { CrudServiceService } from './../../../views/service-crud/crud-service.service';
import { GestorService } from './../gestor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GestorRa } from './../gestorra.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestor-update',
  templateUrl: './gestor-update.component.html',
  styleUrls: ['./gestor-update.component.css']
})
export class GestorUpdateComponent implements OnInit {

  constructor(private service:CrudServiceService,private router: Router,private route:ActivatedRoute, private gestorService:GestorService) { }
  regiao: any;
  gestor:GestorRa= {
    nome: '',
    cpf: '',
    email:'',
    telefone:'',
    regiao: null
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.gestorService.getById(id).subscribe(gestor =>{
      this.gestor = gestor;
    });

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
  
  atualizarGestor(){
    this.gestor.regiao = this.gestor.regiao.id;
    this.gestorService.update(this.gestor).subscribe(
      ()=> {
        this.gestorService.showMessage('Gestor atualizado com sucesso!');
        this.router.navigate(["/gestores"]);
      })
  }
  cancel(){
  this.router.navigate(['/gestores'])
  }

}
