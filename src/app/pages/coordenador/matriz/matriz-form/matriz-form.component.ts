import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatrizCurricular } from './../../../../model/MatrizCurricular';
import { MatrizService } from 'src/app/services/matriz.service';

@Component({
  standalone: true, 
  selector: 'app-matriz-form',
  templateUrl: './matriz-form.component.html',
  styleUrls: ['./matriz-form.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})

export class MatrizFormComponent implements OnInit {
  matrizCurricular: MatrizCurricular;
  sucesso: boolean = false;
  mensagemSucesso: string = '';
  erros: String[];
  id: number;

  constructor(
    private service: MatrizService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.matrizCurricular = new MatrizCurricular();
  }

  ngOnInit(): void {
    document.getElementById('layoutSidenav_content')?.classList.add('semestre-ajuste');
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.service.buscarMatrizCurricularPorId(this.id).subscribe({
          next: (response) => {
            console.log('Matriz Curricular carregado pelo ID:', response);
            this.matrizCurricular = response;
          },
          error: (errorResponse) => {
            console.error('Erro ao buscar matrizCurricular:', errorResponse);
            this.matrizCurricular = new MatrizCurricular();
          }
        });
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/coordenador/matriz/lista'])
  }
  onSubmit() {
    console.error('Matriz Curricular onSubmit:', this.matrizCurricular);
    if (!this.matrizCurricular.ativa) {
      this.sucesso = false;
      this.erros = ['Preencha todos os campos obrigatórios.'];
      return;
    }
    if (this.matrizCurricular.id) {
      this.service
        .atualizar(this.matrizCurricular)
        .subscribe(response => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro atualizado com sucesso!';
          this.erros = null;
        }, erroResponse => {
          this.erros = ['Erro ao atualizar matriz Curricular.']
        })
    } else {
      this.service.salvar(this.matrizCurricular).subscribe({
        next: (response) => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro realizado com sucesso!';
          this.erros = null;
          this.matrizCurricular = response;
          console.log('Response: ', response);
        },
        error: (errorResponse) => {
          console.error("Erro completo recebido da API:", errorResponse);

          if (errorResponse.error && errorResponse.error.message) {
            this.erros = [errorResponse.error.message];
          } else {
            this.erros = ['Erro ao salvar matriz Curricular.'];
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
