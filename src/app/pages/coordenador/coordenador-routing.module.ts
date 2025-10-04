import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../shared/componets/layout/layout.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = []
/*const routes: Routes = [
  {
    path: 'coordenador',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['COORDENADOR', 'ADMIN'] }, // coordenador ou admin
    children: [
      {
        path: 'painel',
        loadComponent: () =>
          import('./coordenador-painel/coordenador-painel.component').then(m => m.CoordenadorPainelComponent),
        data: { roles: ['COORDENADOR', 'ADMIN'] }
      },
      {
        path: 'relatorios',
        loadComponent: () =>
          import('./coordenador-relatorios/coordenador-relatorios.component').then(m => m.CoordenadorRelatoriosComponent),
        data: { roles: ['COORDENADOR', 'ADMIN'] }
      }
    ]
  }
];*/


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordenadorRoutingModule { }
