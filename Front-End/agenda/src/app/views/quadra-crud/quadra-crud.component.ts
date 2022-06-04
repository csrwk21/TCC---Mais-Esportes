import { QuadraService } from './../../components/quadra/quadra.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-quadra-crud',
  templateUrl: './quadra-crud.component.html',
  styleUrls: ['./quadra-crud.component.css']
})
export class QuadraCrudComponent implements OnInit {

  quadras: any;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['nome', 'qtd_pessoas', 'regiao', 'acoes'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor( private router: Router, private service:QuadraService, public _MatPaginatorIntl: MatPaginatorIntl) { }

  ngOnInit(): void {
    this.listQuadras();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  listQuadras(): void {
    this.service.list()
      .subscribe(
        data => {
          this.quadras = data;
          this.dataSource.data = this.quadras;
          setTimeout(() =>{
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = data.count; 
            this.totalRows = this.quadras.length;
          });
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  navigateToQuadraCreate(): void{
    this.router.navigate(['/quadra/create'])
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }
}
