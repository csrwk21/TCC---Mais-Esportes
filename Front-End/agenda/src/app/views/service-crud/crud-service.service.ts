import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  constructor(private http: HttpClient) { }

  buscar(cep:String){
    console.log(cep);
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
  }

  buscarRegioes():Observable<any>{
    return this.http.get(`${baseUrl}/agenda/regiao/`);
  }
}
