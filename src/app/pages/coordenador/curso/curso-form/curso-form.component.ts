import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Curso } from './../../../../model/Curso';
import { CursoService } from './../../../../services/curso.service';

@Component({
  standalone: true,
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class CursoFormComponent implements OnInit {
  curso: Curso;
  sucesso: boolean = false;
  mensagemSucesso: string = '';
  erros: String[];
  id: number;

  constructor(
    private service: CursoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.curso = new Curso();
  }

  ngOnInit(): void {
    document.getElementById('layoutSidenav_content')?.classList.add('semestre-ajuste');
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.service.buscarCursoPorId(this.id).subscribe({
          next: (response) => {
            console.log('Curso carregado pelo ID:', response);
            this.curso = response;
          },
          error: (errorResponse) => {
            console.error('Erro ao buscar curso:', errorResponse);
            this.curso = new Curso();
          }
        });
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/coordenador/curso/lista'])
  }

  onSubmit() {
    console.error('Curso onSubmit:', this.curso);
    if (!this.curso.nome || !this.curso.ativo) {
      this.sucesso = false;
      this.erros = ['Preencha todos os campos obrigatórios.'];
      return;
    }
    if (this.curso.id) {
      this.service
        .atualizar(this.curso)
        .subscribe(response => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro atualizado com sucesso!';
          this.erros = null;
        }, erroResponse => {
          this.erros = ['Erro ao atualizar curso.']
        })
    } else {
      this.service.salvar(this.curso).subscribe({
        next: (response) => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro realizado com sucesso!';
          this.erros = null;
          this.curso = response;
          console.log('Response: ', response);
        },
        error: (errorResponse) => {
          console.error("Erro completo recebido da API:", errorResponse);

          if (errorResponse.error && errorResponse.error.message) {
            this.erros = [errorResponse.error.message];
          } else {
            this.erros = ['Erro ao salvar curso.'];
          }
          console.log('Erro final exibido: ', this.erros);
          this.sucesso = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    document.getElementById('layoutSidenav_content')?.classList.remove('semestre-ajuste');
  }
}
