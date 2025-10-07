import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatrizCurricular } from './../../../../model/MatrizCurricular';
import { MatrizService } from 'src/app/services/matriz.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-matriz-list',
  templateUrl: './matriz-list.component.html',
  styleUrls: ['./matriz-list.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class MatrizListComponent implements OnInit {
  matrizCurricularList: MatrizCurricular[] = [];
  matrizCurricularSelecionada: MatrizCurricular;
  mensagemSucesso: string;
  mensagemErro: string;
  usuarioLogado: any;   

  constructor(
    private service: MatrizService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    document.getElementById('layoutSidenav_content')?.classList.add('semestre-ajuste');
    const usuarioSalvo = sessionStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      this.usuarioLogado = JSON.parse(usuarioSalvo);     
    }
    this.service.buscarMatrizCurricular().subscribe({
      next: (resposta) => {
        this.matrizCurricularList = resposta;        
      },
      error: (err) => console.error('Erro ao buscar matriz curricular:', err)
    });
  }

  novoCadastro() {
    this.router.navigate(['/coordenador/matriz/form'])
  }

  exibirMatrizModalDelet(usuario: MatrizCurricular) {
    this.matrizCurricularSelecionada = usuario;
  }

  deletarMatriz() {
    this.service
      .deletar(this.matrizCurricularSelecionada)
      .subscribe(
        response => {
          this.mensagemSucesso = 'Matriz curricular deletada com sucesso!'
          this.ngOnInit();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar a Matriz curricular.')
  }

  temRole(role: string): boolean {
    if (!this.usuarioLogado || !this.usuarioLogado.roles) return false;
    return this.usuarioLogado.roles.some(r => r.includes(role));
  }

  ngOnDestroy(): void {
    document.getElementById('layoutSidenav_content')?.classList.remove('semestre-ajuste');
  }
}
