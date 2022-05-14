import { CrudServiceService } from './../../../views/service-crud/crud-service.service';
import { Solicitante } from './../solicitante.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitanteService } from './../solicitante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitante-update',
  templateUrl: './solicitante-update.component.html',
  styleUrls: ['./solicitante-update.component.css']
})
export class SolicitanteUpdateComponent implements OnInit {

  constructor(private service:SolicitanteService, private router: Router, private cep:CrudServiceService, private route:ActivatedRoute) { }

  solicitante!: Solicitante;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getById(id).subscribe(solicitante =>{
      this.solicitante = solicitante;
    });
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

  updateSolicitante():void{
    this.service.update(this.solicitante).subscribe(
      ()=>{
        this.service.showMessage('Solicitante atualizado com sucesso!');
        this.router.navigate(["/solicitantes"]);
      })
  }
  cancel():void{
    this.router.navigate(["/solicitantes"]);
  }
}
