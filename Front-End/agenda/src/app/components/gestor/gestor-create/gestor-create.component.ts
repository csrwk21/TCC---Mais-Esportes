import { GestorRa } from './../gestorra.model';
import { GestorService } from './../gestor.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/views/service-crud/crud-service.service';
import { AccountService } from 'src/app/account/shared/account.service';


@Component({
  selector: 'app-gestor-create',
  templateUrl: './gestor-create.component.html',
  styleUrls: ['./gestor-create.component.css']
})
export class GestorCreateComponent implements OnInit {

  regiao: any;
  confSenha:String = '';
  gestor:GestorRa= {
    nome: '',
    cpf: '',
    email:'',
    telefone:'',
    regiao: null
  }
  
  usuario:any ={
    login:'',
    senha:'',
    admin:false
  }

  constructor(private service:CrudServiceService, private router:Router, private gestorService: GestorService,private accountService:AccountService) { }

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
    if(this.usuario.senha == this.confSenha){
      this.gestorService.create(this.gestor).subscribe(()=>{
        this.accountService.create(this.usuario).subscribe(()=>{
          this.gestorService.showMessage("Gestor criado com Sucesso!");
          this.router.navigate(['/gestores']);
      })
      
    })
    }else{
      this.gestorService.showMessage("Senhas não conferem",true)
    }

    
    
  }
  cancel():void{
  this.router.navigate(['/gestores'])
  }

}
