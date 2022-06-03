import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";
import { SolicitanteService } from 'src/app/components/solicitante/solicitante.service';

@Component({
  selector: 'app-solicitante-crud',
  templateUrl: './solicitante-crud.component.html',
  styleUrls: ['./solicitante-crud.component.css']
})


export class SolicitanteCrudComponent implements OnInit {
  
  solicitantes: any;
  filteredSolicitantes: any[] = [];
  _filterby!: string;
  lowValue = 0
  highValue = 20;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['nome', 'cpf', 'email', 'acoes'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private router: Router, private service: SolicitanteService, public _MatPaginatorIntl: MatPaginatorIntl) { 

  }

  ngOnInit(): void {
    this._MatPaginatorIntl.itemsPerPageLabel = 'items por Página';
    this.listSolicitantes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listSolicitantes(): void {
    this.service.list()
      .subscribe(
        data => {
          this.solicitantes = data;
          this.dataSource.data = this.solicitantes;
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = data.count; 
            this.totalRows = this.solicitantes.length;
          });
        },
        error => {
          console.log(error);
        });
  }

  set filter(value:string){
    this._filterby = value;
    this.dataSource.data = this.solicitantes.filter((sol:any)=>sol.nome.toLocaleLowerCase().indexOf(this._filterby.toLocaleLowerCase()) > -1);

  }
  get filter(){
    return this._filterby
  }

  navigateToSolicitanteCreate(): void{
    this.router.navigate(['/solicitante/create'])
  }

  // public getPaginatorData(event: PageEvent): PageEvent {
  //   this.lowValue = event.pageIndex * event.pageSize;
  //   this.highValue = this.lowValue + event.pageSize;
  //   return event;
  // }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    //this.listSolicitantes();
  }
}
