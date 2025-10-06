import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Semestre } from 'src/app/model/Semestre';
import { SemestreService } from 'src/app/services/semestre.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-semestre-from',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './semestre-from.component.html',
  styleUrls: ['./semestre-from.component.css']
})
export class SemestreFromComponent implements OnInit {
  semestre: Semestre;
  sucesso: boolean = false;
  mensagemSucesso: string = '';
  erros: String[];
  id: number;

  constructor(
    private service: SemestreService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.semestre = new Semestre();
  }

  ngOnInit(): void {
    document.getElementById('layoutSidenav_content')?.classList.add('semestre-ajuste');
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.service.buscarSemestrePorId(this.id).subscribe({
          next: (response) => {
            console.log('Semestre carregado pelo ID:', response);
            this.semestre = response;
          },
          error: (errorResponse) => {
            console.error('Erro ao buscar semestre:', errorResponse);
            this.semestre = new Semestre();
          }
        });
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/coordenador/semestre/lista'])
  }

  onSubmit() {
    console.error('Semestre onSubmit:', this.semestre);
    if (!this.semestre.ano || !this.semestre.periodo) {
      this.sucesso = false;
      this.erros = ['Preencha todos os campos obrigatórios.'];
      return;
    }
    if (this.semestre.id) {
      this.service
        .atualizar(this.semestre)
        .subscribe(response => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro atualizado com sucesso!';
          this.erros = null;
        }, erroResponse => {
          this.erros = ['Erro ao atualizar semestre.']
        })
    } else {
      this.service.salvar(this.semestre).subscribe({
        next: (response) => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro realizado com sucesso!';
          this.erros = null;
          this.semestre = response;
          console.log('Response: ', response);
        },
        error: (errorResponse) => {
          console.error("Erro completo recebido da API:", errorResponse);

          if (errorResponse.error && errorResponse.error.message) {
            this.erros = [errorResponse.error.message];
          } else {
            this.erros = ['Erro ao salvar semestre.'];
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
