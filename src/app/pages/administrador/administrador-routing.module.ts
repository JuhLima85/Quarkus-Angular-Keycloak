import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../shared/componets/layout/layout.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path: 'usuario',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMINISTRADOR'] }, 
    children: [
      {
        path: 'form',
        loadComponent: () =>
          import('./usuario-form/usuario-form.component').then(m => m.UsuariosFormComponent),
          data: { roles: ['ADMINISTRADOR'] }
      },
      {
        path: 'form/:id',
        loadComponent: () =>
          import('./usuario-form/usuario-form.component').then(m => m.UsuariosFormComponent),
          data: { roles: ['ADMINISTRADOR'] }
      },
      {
        path: 'lista',
        loadComponent: () =>
          import('./usuario-lista/usuario-lista.component').then(m => m.ClientesListaComponent),
          data: { roles: ['ADMINISTRADOR', ] }
      },
      { path: '', redirectTo: '/usuario/lista', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {}

