import { QuadraService } from './../quadra.service';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CrudServiceService } from 'src/app/views/service-crud/crud-service.service';
import { Quadra } from '../quadra.model';

@Component({
  selector: 'app-quadra-create',
  templateUrl: './quadra-create.component.html',
  styleUrls: ['./quadra-create.component.css']
})
export class QuadraCreateComponent implements OnInit {

  constructor(private router: Router, private service:CrudServiceService, private quadraService: QuadraService) { }

  quadra:Quadra  = {
    nome: '',
    qtd_pessoas: '',
    regiao: null,
    endereco:{
        cep: '',
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        complemento: '',
        numero: ''
    }
  }
  
  ngOnInit(): void {
    this.exibirRegioes();
  }

  regiao: any;

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

  exibirRegioes():void{
    this.service.buscarRegioes().subscribe(
      data=>{ this.regiao = data;
      },
      error => {
        console.log(error);
      });
  }

  createQuadra(): void{
    
    if(this.validacaoFormulario()){
    this.quadra.regiao = this.quadra.regiao.id;
    this.quadraService.create(this.quadra).subscribe(()=>{
     this.quadraService.showMessage("Quadra criada!")
      this.router.navigate(['/quadras'])
    })
  }
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
