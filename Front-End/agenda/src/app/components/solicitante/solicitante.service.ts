
import { Solicitante } from './solicitante.model';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitanteService {

  baseUrl = 'http://localhost:8080/agenda/solicitante/';

  constructor(private snackBar: MatSnackBar, private http: HttpClient ) { }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg,'x',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error']:['msg-sucess']
    });
  }

  create(solicitante: Solicitante): Observable<Solicitante>{
    return this.http.post<Solicitante>(this.baseUrl,solicitante).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any>{
    const msg = e.error.errors;
    this.showMessage(`${msg}`,true)
    return EMPTY;
  }

  list(): Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getById(id: any):Observable<any>{
    return this.http.get(`${this.baseUrl}${id}`);
  }

  update(solicitante:Solicitante):Observable<Solicitante>{
    const url = `${this.baseUrl}${solicitante.id}`
    return this.http.put<Solicitante>(url,solicitante).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: any):Observable<Solicitante>{
    return this.http.delete<Solicitante>(`${this.baseUrl}${id}`);
  }

  


}
