import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Semestre } from './../../../../model/Semestre';
import { SemestreService } from './../../../../services/semestre.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-semestre-list',
  templateUrl: './semestre-list.component.html',
  styleUrls: ['./semestre-list.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})

export class SemestreListComponent implements OnInit {

  semestres: Semestre[] = [];
  semestreSelecionado: Semestre;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: SemestreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    document.getElementById('layoutSidenav_content')?.classList.add('semestre-ajuste');
    this.service.buscarSemestres().subscribe({
      next: (resposta) => {
        this.semestres = resposta;        
      },
      error: (err) => console.error('Erro ao buscar semestres:', err)
    });
  }

  ngOnDestroy(): void {
    document.getElementById('layoutSidenav_content')?.classList.remove('semestre-ajuste');
  }

  novoCadastro() {
    this.router.navigate(['/coordenador/semestre/form'])
  }

  exibirSemestreModalDelet(semestre: Semestre) {
    this.semestreSelecionado = semestre;
  }

  deletarSemestre() {
    this.service
      .deletar(this.semestreSelecionado)
      .subscribe(
        response => {
          this.mensagemSucesso = 'Semestre deletado com sucesso!'
          this.ngOnInit();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar o Semestre.')
  }
}
