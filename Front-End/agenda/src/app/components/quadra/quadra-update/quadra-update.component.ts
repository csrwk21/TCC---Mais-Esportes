import { CrudServiceService } from 'src/app/views/service-crud/crud-service.service';
import { Quadra } from './../quadra.model';
import { QuadraService } from './../quadra.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quadra-update',
  templateUrl: './quadra-update.component.html',
  styleUrls: ['./quadra-update.component.css']
})
export class QuadraUpdateComponent implements OnInit {

  constructor(private router: Router,private service:CrudServiceService, private quadraService: QuadraService, private route:ActivatedRoute) { }

  quadra!:Quadra;
  regiao: any;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quadraService.getById(id).subscribe(quadra =>{
      this.quadra = quadra;
    });

    this.exibirRegioes();
  }

  updateQuadra():void{
    this.quadraService.update(this.quadra).subscribe(
      ()=> {
        this.quadraService.showMessage('Quadra atualizada com sucesso!');
        this.router.navigate(["/quadras"]);
      })
  }

  exibirRegioes():void{
    this.service.buscarRegioes().subscribe(
      data=>{ this.regiao = data;
      },
      error => {
        console.log(error);
      });
  }

  consultaCep(valor: any, form: any){
    this.service.buscar(valor).subscribe((dados)=>this.populaForm(dados, form));
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


  cancel(): void{
    this.router.navigate(['/quadras'])
  }

}
