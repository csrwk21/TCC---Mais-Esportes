import { Component, OnInit } from '@angular/core';
import { Router }from "@angular/router";
@Component({
  selector: 'app-gestor-crud',
  templateUrl: './gestor-crud.component.html',
  styleUrls: ['./gestor-crud.component.css']
})
export class GestorCrudComponent implements OnInit {

  constructor(private router: Router) { }
  gestores: any;
  ngOnInit(): void {
  }
 
  navigateToGestorCreate(): void{
    this.router.navigate(['/gestor/create'])
  }
}
