import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component'; 
import { LayoutComponent } from '../app/shared/componets/layout/layout.component';
import { AuthGuard } from './auth.guard';
import { AcessoNegadoComponent } from './pages/acesso-negado/acesso-negado.component';

const routes: Routes = [
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { 
    path: '', 
    component: LayoutComponent, 
    canActivate: [AuthGuard], 
    children: [
      { path:'home', component: HomeComponent },   
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }