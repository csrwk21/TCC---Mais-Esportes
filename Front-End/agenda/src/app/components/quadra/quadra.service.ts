import { Quadra } from './quadra.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Observable, EMPTY, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuadraService {

  baseUrl = 'http://localhost:8080/agenda/quadra/';

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

  create(quadra: Quadra): Observable<Quadra>{
    console.log(quadra);
    return this.http.post<Quadra>(this.baseUrl,quadra).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(quadra:Quadra):Observable<Quadra>{
    const url = `${this.baseUrl}${quadra.id}`
    return this.http.put<Quadra>(url,quadra).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
  delete(id: any):Observable<Quadra>{
    return this.http.delete<Quadra>(`${this.baseUrl}${id}`);
  }
  
  getById(id: any):Observable<any>{
    return this.http.get(`${this.baseUrl}${id}`)
  }

  list(): Observable<any>{
    return this.http.get(this.baseUrl);
  }
}
