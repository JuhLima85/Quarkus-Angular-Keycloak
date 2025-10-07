import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Disciplina } from './../../../../model/Disciplina';
import { DisciplinaService } from './../../../../services/disciplina.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-disciplina-list',
  templateUrl: './disciplina-list.component.html',
  styleUrls: ['./disciplina-list.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class DisciplinaListComponent implements OnInit {
  disciplinas: Disciplina[] = [];
  disciplinaSelecionada: Disciplina;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: DisciplinaService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    document.getElementById('layoutSidenav_content')?.classList.add('semestre-ajuste');
    this.service.buscarDisciplinas().subscribe({
      next: (resposta) => {
        this.disciplinas = resposta;        
      },
      error: (err) => console.error('Erro ao buscar disciplina:', err)
    });
  }

  novoCadastro() {
    this.router.navigate(['/coordenador/disciplina/form'])
  }

  exibirUsuarioModalDelet(disciplina: Disciplina) {
    this.disciplinaSelecionada = disciplina;
  }

  deletarDisciplina() {
    this.service
      .deletar(this.disciplinaSelecionada)
      .subscribe(
        response => {
          this.mensagemSucesso = 'Disciplina deletada com sucesso!'
          this.ngOnInit();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar a disciplina.')
  } 

  ngOnDestroy(): void {
    document.getElementById('layoutSidenav_content')?.classList.remove('semestre-ajuste');
  }
}
