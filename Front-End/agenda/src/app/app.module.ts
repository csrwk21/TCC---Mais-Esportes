import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import{ MatSidenavModule }from '@angular/material/sidenav';
import{ MatCardModule }from '@angular/material/card';
import{ MatListModule }from '@angular/material/list';
import{ MatButtonModule }from '@angular/material/button';
import{ MatSnackBarModule }from '@angular/material/snack-bar';

import { HomeComponent } from './views/home/home.component';
import { SolicitanteCrudComponent } from './views/solicitante-crud/solicitante-crud.component';
import { GestorCrudComponent } from './views/gestor-crud/gestor-crud.component';
import { QuadraCrudComponent } from './views/quadra-crud/quadra-crud.component';

import { SolicitanteCreateComponent } from './components/solicitante/solicitante-create/solicitante-create.component';
import { QuadraCreateComponent } from './components/quadra/quadra-create/quadra-create.component';
import { GestorCreateComponent } from './components/gestor/gestor-create/gestor-create.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReservaCreateComponent } from './components/reserva/reserva-create/reserva-create.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { SolicitanteUpdateComponent } from './components/solicitante/solicitante-update/solicitante-update.component';
import { QuadraUpdateComponent } from './components/quadra/quadra-update/quadra-update.component';
import { SolicitanteDeleteComponent } from './components/solicitante/solicitante-delete/solicitante-delete.component';
import { QuadraDeleteComponent } from './components/quadra/quadra-delete/quadra-delete.component';
import { GestorDeleteComponent } from './components/gestor/gestor-delete/gestor-delete.component';
import { GestorUpdateComponent } from './components/gestor/gestor-update/gestor-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

import { LoginComponent } from './account/login/login.component';
import { CreatAccountComponent } from './account/creat-account/creat-account.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { InicioComponent } from './layout/inicio/inicio.component';

import { httpInterceptorProviders } from './http-interceptors';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    SolicitanteCrudComponent,
    GestorCrudComponent,
    QuadraCrudComponent,
    SolicitanteCreateComponent,
    QuadraCreateComponent,
    GestorCreateComponent,
    ReservaCreateComponent,
    SolicitanteUpdateComponent,
    QuadraUpdateComponent,
    SolicitanteDeleteComponent,
    QuadraDeleteComponent,
    GestorDeleteComponent,
    GestorUpdateComponent,
    LoginComponent,
    CreatAccountComponent,
    AuthenticationComponent,
    InicioComponent

  ],
  imports: [
    NgxMaskModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NgbModule,
    MatPaginatorModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatSelectModule,
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
