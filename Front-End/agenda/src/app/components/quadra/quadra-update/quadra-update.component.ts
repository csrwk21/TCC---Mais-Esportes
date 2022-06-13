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
    if(this.validacaoFormulario()){
    this.quadraService.update(this.quadra).subscribe(
      ()=> {
        this.quadraService.showMessage('Quadra atualizada com sucesso!');
        this.router.navigate(["/quadras"]);
      })
    }
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

  validacaoFormulario():boolean{
    
    let quadra = this.quadra;
  
    if(quadra.nome == ''){
      this.quadraService.showMessage("Nome quadra é obrigatório",true)
      return false;
    }
    if(quadra.qtd_pessoas == ''){
      this.quadraService.showMessage("Quantidade de pessoas na quadra é obrigatório",true)
      return false;
    }
    if(quadra.regiao == '' || quadra.regiao == null){
      this.quadraService.showMessage("Região da quadra é obrigatório",true)
      return false;
    }
  
    if(quadra.endereco.cep == ''){
      this.quadraService.showMessage("Cep quadra é obrigatório",true)
      return false;
    }
    if(quadra.endereco.logradouro == ''){
      this.quadraService.showMessage("Logradouro quadra é obrigatório",true)
      return false;
    }
    if(quadra.endereco.bairro == ''){
      this.quadraService.showMessage("Bairro quadra é obrigatório",true)
      return false;
    }
    if(quadra.endereco.localidade == ''){
      this.quadraService.showMessage("Localidade quadra é obrigatório",true)
      return false;
    }
    if(quadra.endereco.uf == ''){
      this.quadraService.showMessage("UF quadra é obrigatório",true)
      return false;
    }
  
    return true;
  }
  }
