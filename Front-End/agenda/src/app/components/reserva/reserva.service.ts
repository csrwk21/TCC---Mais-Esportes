import { MatSnackBar } from '@angular/material/snack-bar';
import { NovaReserva } from './novaReserva.model';
import { Observable, EMPTY, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './Email.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  baseUrl = 'http://localhost:8080/agenda/reserva/';
  baseUrlEmail = 'http://localhost:8080/agenda/email/';
  
  constructor(private http:HttpClient, private snackBar: MatSnackBar) { }

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

  list(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}quadra/${id}`);
  }

  buscarReserva(id:any):Observable<any>{
    return this.http.get(`${this.baseUrl}${id}`);
  }

  cancelarReserva(id:any , status:any):Observable<any>{
    return this.http.patch(`${this.baseUrl}${id}`,status).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  fazerReserva(reserva:NovaReserva):Observable<NovaReserva>{
    return this.http.post<NovaReserva>(`${this.baseUrl}`,reserva).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  enviarEmail(email:any):Observable<any>{
    console.log(email)
    return this.http.post<any>(`${this.baseUrlEmail}`,email).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

}
