import { GestorService } from './../gestor.service';
import { GestorRa } from './../gestorra.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestor-delete',
  templateUrl: './gestor-delete.component.html',
  styleUrls: ['./gestor-delete.component.css']
})
export class GestorDeleteComponent implements OnInit {

  gestor:GestorRa = {
    nome: '',
    cpf: '',
    email:'',
    telefone:'',
    regiao: ''
  }
  regiao: any;

  constructor(private router:Router, private route:ActivatedRoute, private gestorService: GestorService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.gestorService.getById(id).subscribe(gestor =>{
      this.gestor = gestor;
    });
  }

  deleteGestor():void{
    let confirmacao = confirm('Deseja realmente excluir esse gestor?');
    if(confirmacao){
    this.gestorService.delete(this.gestor.id).subscribe(()=>{
      this.gestorService.showMessage('Gestor deletado com sucesso');
      this.router.navigate(['/gestores']);
    })
    }
  }
  cancel():void{
    this.router.navigate(['/gestores']);
    }

}
