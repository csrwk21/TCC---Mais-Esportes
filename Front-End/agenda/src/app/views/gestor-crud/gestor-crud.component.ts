import { GestorService } from './../../components/gestor/gestor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }from "@angular/router";
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-gestor-crud',
  templateUrl: './gestor-crud.component.html',
  styleUrls: ['./gestor-crud.component.css']
})
export class GestorCrudComponent implements OnInit {

  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['nome', 'regiao', 'telefone', 'acoes'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private router: Router, private service:GestorService, public _MatPaginatorIntl: MatPaginatorIntl) { }
  gestores: any;
  
  ngOnInit(): void {
    this._MatPaginatorIntl.itemsPerPageLabel = 'items por Página';
    this.listGestores();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listGestores(): void {
    this.service.list()
      .subscribe(
        data => {
          this.gestores = data;
          this.dataSource.data = this.gestores;
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = data.count; 
            this.totalRows = this.gestores.length;
          })
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  navigateToGestorCreate(): void{
    this.router.navigate(['/gestor/create'])
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }

}
