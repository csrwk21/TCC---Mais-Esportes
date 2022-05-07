
import { Solicitante } from './solicitante.model';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitanteService {

  baseUrl = 'http://localhost:8080/agenda/solicitante/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient ) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg,'x',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(solicitante: Solicitante): Observable<Solicitante>{
    return this.http.post<Solicitante>(this.baseUrl,solicitante)
  }

  list(): Observable<any>{
    return this.http.get(this.baseUrl);
  }


}
