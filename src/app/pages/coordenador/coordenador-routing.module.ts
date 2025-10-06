import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../shared/componets/layout/layout.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path: 'semestre',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['coordenador'] },
    children: [
      {
        path: 'lista',
        loadComponent: () =>
          import('./semestre/semestre-list/semestre-list.component')
            .then(m => m.SemestreListComponent),
        data: { roles: ['coordenador'] }
      },
      {
        path: 'form',
        loadComponent: () =>
          import('./semestre/semestre-from/semestre-from.component')
            .then(m => m.SemestreFromComponent),
        data: { roles: ['coordenador'] }
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./semestre/semestre-from/semestre-from.component')
            .then(m => m.SemestreFromComponent),
        data: { roles: ['coordenador'] }
      },
      { path: '', redirectTo: 'lista', pathMatch: 'full' }
    ]
  },

  {
    path: 'curso',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['coordenador'] },
    children: [
      {
        path: 'lista',
        loadComponent: () =>
          import('./curso/curso-list/curso-list.component')
            .then(m => m.CursoListComponent),
        data: { roles: ['coordenador'] }
      },
      {
        path: 'form',
        loadComponent: () =>
          import('./curso/curso-form/curso-form.component')
            .then(m => m.CursoFormComponent),
        data: { roles: ['coordenador'] }
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./curso/curso-form/curso-form.component')
            .then(m => m.CursoFormComponent),
        data: { roles: ['coordenador'] }
      },
      { path: '', redirectTo: 'lista', pathMatch: 'full' }
    ]
  },

  {
    path: 'disciplina',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['coordenador'] },
    children: [
      {
        path: 'lista',
        loadComponent: () =>
          import('./disciplina/disciplina-list/disciplina-list.component')
            .then(m => m.DisciplinaListComponent),
        data: { roles: ['coordenador'] }
      },
      {
        path: 'form',
        loadComponent: () =>
          import('./disciplina/disciplina-form/disciplina-form.component')
            .then(m => m.DisciplinaFormComponent),
        data: { roles: ['coordenador'] }
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./disciplina/disciplina-form/disciplina-form.component')
            .then(m => m.DisciplinaFormComponent),
        data: { roles: ['coordenador'] }
      },
      { path: '', redirectTo: 'lista', pathMatch: 'full' }
    ]
  },

  {
    path: 'matriz',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: ['coordenador', 'aluno', 'professor'] },
    children: [
      {
        path: 'lista',
        loadComponent: () =>
          import('./matriz/matriz-list/matriz-list.component')
            .then(m => m.MatrizListComponent),
        data: { roles: ['coordenador', 'aluno', 'professor'] }
      },
      {
        path: 'form',
        loadComponent: () =>
          import('./matriz/matriz-form/matriz-form.component')
            .then(m => m.MatrizFormComponent),
        data: { roles: ['coordenador'] }
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./matriz/matriz-form/matriz-form.component')
            .then(m => m.MatrizFormComponent),
        data: { roles: ['coordenador'] }
      },
      { path: '', redirectTo: 'lista', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordenadorRoutingModule { }
