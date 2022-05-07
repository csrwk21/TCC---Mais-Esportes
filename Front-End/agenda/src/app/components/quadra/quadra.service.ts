import { Quadra } from './quadra.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuadraService {

  baseUrl = 'http://localhost:8080/agenda/quadra/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg,'x',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(quadra: Quadra): Observable<Quadra>{
    console.log(quadra);
    return this.http.post<Quadra>(this.baseUrl,quadra)
  }

  list(): Observable<any>{
    return this.http.get(this.baseUrl);
  }
}
