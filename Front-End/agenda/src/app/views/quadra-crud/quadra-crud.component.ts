import { QuadraService } from './../../components/quadra/quadra.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-quadra-crud',
  templateUrl: './quadra-crud.component.html',
  styleUrls: ['./quadra-crud.component.css']
})
export class QuadraCrudComponent implements OnInit {

  constructor( private router: Router, private service:QuadraService) { }

  quadras: any;

  ngOnInit(): void {
    this.listQuadras();
  }


  listQuadras(): void {
    this.service.list()
      .subscribe(
        data => {
          this.quadras = data;
          console.log('data');
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  navigateToQuadraCreate(): void{
    this.router.navigate(['/quadra/create'])
  }
}
