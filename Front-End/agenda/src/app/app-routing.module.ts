import { AuthGuard } from './account/shared/auth.guard';
import { CreatAccountComponent } from './account/creat-account/creat-account.component';
import { LoginComponent } from './account/login/login.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { InicioComponent } from './layout/inicio/inicio.component';
import { GestorDeleteComponent } from './components/gestor/gestor-delete/gestor-delete.component';
import { GestorUpdateComponent } from './components/gestor/gestor-update/gestor-update.component';
import { QuadraDeleteComponent } from './components/quadra/quadra-delete/quadra-delete.component';
import { SolicitanteDeleteComponent } from './components/solicitante/solicitante-delete/solicitante-delete.component';
import { QuadraUpdateComponent } from './components/quadra/quadra-update/quadra-update.component';
import { SolicitanteUpdateComponent } from './components/solicitante/solicitante-update/solicitante-update.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from'./views/home/home.component';
import { SolicitanteCrudComponent } from './views/solicitante-crud/solicitante-crud.component';
import { GestorCrudComponent } from './views/gestor-crud/gestor-crud.component';
import { QuadraCrudComponent } from './views/quadra-crud/quadra-crud.component';

import { SolicitanteCreateComponent } from './components/solicitante/solicitante-create/solicitante-create.component';
import { QuadraCreateComponent } from './components/quadra/quadra-create/quadra-create.component';
import { GestorCreateComponent } from './components/gestor/gestor-create/gestor-create.component';
import { ReservaCreateComponent } from './components/reserva/reserva-create/reserva-create.component';
import { ConsultaPublicaComponent } from './publico/consulta-publica/consulta-publica.component';

const routes: Routes = [{
    path:'consulta',
    component: ConsultaPublicaComponent,
  },
  {
  path: "",
  component: InicioComponent,
  children:[
    {
      path:"",
      component: HomeComponent
    },
    {
      path:"solicitantes",
      component: SolicitanteCrudComponent
    },
    {
      path:"gestores",
      component: GestorCrudComponent
    },
    {
      path:"quadras",
      component: QuadraCrudComponent
    },
    {
      path:"solicitante/create",
      component: SolicitanteCreateComponent
    },
    {
      path:"solicitante/update/:id",
      component: SolicitanteUpdateComponent
    },
    {
      path:"solicitante/delete/:id",
      component: SolicitanteDeleteComponent
    },
    {
      path:"quadra/create",
      component: QuadraCreateComponent
    },
    {
      path:"quadra/update/:id",
      component: QuadraUpdateComponent
    },
    {
      path:"quadra/delete/:id",
      component: QuadraDeleteComponent
    },
    {
      path:"gestor/create",
      component: GestorCreateComponent
    },
    {
      path:"gestor/update/:id",
      component: GestorUpdateComponent
    },
    {
      path:"gestor/delete/:id",
      component: GestorDeleteComponent
    },
    {
      path:"reserva/create",
      component: ReservaCreateComponent
    }
  ],
  canActivate:[AuthGuard]
},
{
  path:'',
  component: AuthenticationComponent,
  children:[
    {
      path:'', redirectTo:'login', pathMatch:'full'
    },
    {
      path:'login',
      component: LoginComponent
    },
    {
      path:'create-account',
      component: CreatAccountComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
