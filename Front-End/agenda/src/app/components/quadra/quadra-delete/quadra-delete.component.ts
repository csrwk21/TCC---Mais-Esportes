import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CrudServiceService } from './../../../views/service-crud/crud-service.service';
import { QuadraService } from './../quadra.service';
import { Component, OnInit } from '@angular/core';
import { Quadra } from '../quadra.model';

@Component({
  selector: 'app-quadra-delete',
  templateUrl: './quadra-delete.component.html',
  styleUrls: ['./quadra-delete.component.css']
})
export class QuadraDeleteComponent implements OnInit {

  constructor(private router: Router,private service:CrudServiceService, private quadraService: QuadraService, private route:ActivatedRoute) { }

  quadra!:Quadra;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quadraService.getById(id).subscribe(quadra =>{
      this.quadra = quadra;
    });
  }

  deleteQuadra():void{
    this.quadraService.delete(this.quadra.id).subscribe(()=>{
      this.quadraService.showMessage("Quadra deletada com sucesso!")
      this.router.navigate(["/quadras"]);
    })
  }

  cancel():void{
    this.router.navigate(["/quadras"]);
  }

}
