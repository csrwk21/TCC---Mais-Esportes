import { GestorRa } from './gestorra.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, map, catchError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestorService {

  baseUrl = 'http://localhost:8080/agenda/gestorra/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg,'x',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error']:['msg-sucess']
    });
  }

  errorHandler(e: any): Observable<any>{
    const msg = e.error.errors;
    this.showMessage(`${msg}`,true)
    return EMPTY;
  }

  create(gestor: GestorRa): Observable<GestorRa>{
    return this.http.post<GestorRa>(this.baseUrl,gestor).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  getById(id: any):Observable<any>{
    return this.http.get(`${this.baseUrl}${id}`)
  }

  delete(id: any):Observable<any>{
    return this.http.delete(`${this.baseUrl}${id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(gestor:GestorRa):Observable<any>{
    let id = gestor.id;
    return this.http.put(`${this.baseUrl}${id}`,gestor).pipe(
      map(obj => obj),
     catchError(e => this.errorHandler(e))
    )
  }

  list(): Observable<any>{
    return this.http.get(this.baseUrl);
  }

}
