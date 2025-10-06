import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Disciplina } from './../../../../model/Disciplina';
import { DisciplinaService } from './../../../../services/disciplina.service';

@Component({
  standalone: true,
  selector: 'app-disciplina-form',
  templateUrl: './disciplina-form.component.html',
  styleUrls: ['./disciplina-form.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class DisciplinaFormComponent implements OnInit {
  disciplina: Disciplina;
  sucesso: boolean = false;
  mensagemSucesso: string = '';
  erros: String[];
  id: number;

  constructor(
    private service: DisciplinaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.disciplina = new Disciplina();
  }

  ngOnInit(): void {
    document.getElementById('layoutSidenav_content')?.classList.add('semestre-ajuste');
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.service.buscarDisciplinaPorId(this.id).subscribe({
          next: (response) => {
            console.log('Disciplina carregado pelo ID:', response);
            this.disciplina = response;
          },
          error: (errorResponse) => {
            console.error('Erro ao buscar disciplina:', errorResponse);
            this.disciplina = new Disciplina();
          }
        });
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/coordenador/disciplina/lista'])
  }

  onSubmit() {
    console.error('Disciplina onSubmit:', this.disciplina);
    if (!this.disciplina.nome || !this.disciplina.codigo) {
      this.sucesso = false;
      this.erros = ['Preencha todos os campos obrigatórios.'];
      return;
    }
    if (this.disciplina.id) {
      this.service
        .atualizar(this.disciplina)
        .subscribe(response => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro atualizado com sucesso!';
          this.erros = null;
        }, erroResponse => {
          this.erros = ['Erro ao atualizar disciplina.']
        })
    } else {
      this.service.salvar(this.disciplina).subscribe({
        next: (response) => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro realizado com sucesso!';
          this.erros = null;
          this.disciplina = response;
          console.log('Response: ', response);
        },
        error: (errorResponse) => {
          console.error("Erro completo recebido da API:", errorResponse);

          if (errorResponse.error && errorResponse.error.message) {
            this.erros = [errorResponse.error.message];
          } else {
            this.erros = ['Erro ao salvar disciplina.'];
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