import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/shared/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private accountService:AccountService) { }

  nomeUsuario:any = '';
  
  ngOnInit(): void {
    this.buscarNomeUsuario();
  }

  buscarNomeUsuario(){
    this.nomeUsuario = this.accountService.getBuscarNomeUsuario();
  }

}
