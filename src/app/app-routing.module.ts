import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component'; 
import { LayoutComponent } from '../app/shared/componets/layout/layout.component';
import { AuthGuard } from './auth.guard';
import { AcessoNegadoComponent } from './pages/acesso-negado/acesso-negado.component';

//app-routing.module.ts
const routes: Routes = [
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { 
    path: '', 
    component: LayoutComponent, 
    canActivate: [AuthGuard], 
    children: [
      { path:'home', component: HomeComponent },  
      { path: 'coordenador', loadChildren: () => import('./pages/coordenador/coordenador-routing.module').then(m => m.CoordenadorRoutingModule) }, 
      { path: 'administrador', loadChildren: () => import('./pages/administrador/administrador-routing.module').then(m => m.AdministradorRoutingModule) }, 
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }