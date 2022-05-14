import { GestorService } from './../../components/gestor/gestor.service';
import { Component, OnInit } from '@angular/core';
import { Router }from "@angular/router";
@Component({
  selector: 'app-gestor-crud',
  templateUrl: './gestor-crud.component.html',
  styleUrls: ['./gestor-crud.component.css']
})
export class GestorCrudComponent implements OnInit {

  constructor(private router: Router, private service:GestorService) { }
  gestores: any;
  ngOnInit(): void {
    this.listGestores();
  }
  
  listGestores(): void {
    this.service.list()
      .subscribe(
        data => {
          this.gestores = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  navigateToGestorCreate(): void{
    this.router.navigate(['/gestor/create'])
  }

}
