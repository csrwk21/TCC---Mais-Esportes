import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:8080/agenda/usuarios/auth';
  baseUrlCriar = 'http://localhost:8080/agenda/usuarios';
  constructor(private http:HttpClient,private snackBar: MatSnackBar) { }
  
  
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

   async login(user:any){
    const result = await this.http.post<any>(this.baseUrl,user).toPromise();

    if(result && result.token){
      window.localStorage.setItem('token',result.token);
      return true;
    }

    return false;
  }

  create(usuario: any): Observable<any>{
    return this.http.post<any>(this.baseUrlCriar,usuario).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): any {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
