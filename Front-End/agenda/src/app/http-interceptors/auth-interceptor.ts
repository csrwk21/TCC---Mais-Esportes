import { AccountService } from './../account/shared/account.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private accountService:AccountService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        
        const token = this.accountService.getAuthorizationToken();
        let request: HttpRequest<any> = req;
    
        if(token){

            request = req.clone({
                headers:req.headers.set('Authorization',`Bearer ${token}`)
            });
        }

        return next.handle(request);
        
    }

    private handleError(error:HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            console.error('Ocorreu um erro:', error.error.message);
        }else{
            alert(
                `Erro: ${JSON.stringify(error.error)}`
            );
            alert(error.error.message);
        }
       
        return throwError('Ocorreu um erro, tente novamente');
    }
}