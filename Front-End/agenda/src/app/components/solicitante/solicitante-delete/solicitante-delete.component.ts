import { SolicitanteService } from 'src/app/components/solicitante/solicitante.service';
import { CrudServiceService } from './../../../views/service-crud/crud-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Solicitante } from './../solicitante.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitante-delete',
  templateUrl: './solicitante-delete.component.html',
  styleUrls: ['./solicitante-delete.component.css']
})
export class SolicitanteDeleteComponent implements OnInit {

  solicitante!:Solicitante;
  constructor(private service:SolicitanteService, private router: Router, private cep:CrudServiceService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getById(id).subscribe(solicitante =>{
      this.solicitante = solicitante;
    });
  }


  deleteSolicitante():void{
    let confirmacao = confirm('Deseja realmente excluir esse solicitante?');
    if(confirmacao){
    this.service.delete(this.solicitante.id).subscribe(
      ()=>{
        this.service.showMessage('Solicitante excluido com sucesso!');
        this.router.navigate(["/solicitantes"]);
      })
    }
  }
  
  cancel():void{
    this.router.navigate(["/solicitantes"]);
  }

}
