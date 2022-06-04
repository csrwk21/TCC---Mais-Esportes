import { Router } from '@angular/router';
import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {
    login:'',
    senha:''
  };

  constructor(private accountService:AccountService, private router:Router) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    try {
      const result = await this.accountService.login(this.usuario);
      console.log(`Login efetuado: ${result}`)
      this.router.navigate(['']);
    } catch (error) {
      console.log(error);
    }
  }

}
