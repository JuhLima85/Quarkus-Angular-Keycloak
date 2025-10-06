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
            this.disciplina = response;
          },
          error: (errorResponse) => {            
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
    const tratarErro = (errorResponse: any, acao: string) => {
      this.sucesso = false;
  
      if (errorResponse?.error?.violations?.length) {        
        this.erros = errorResponse.error.violations.map((v: any) => {         
          const nomeCampo = v.field?.split('.')?.pop() || 'Campo';
          const campoFormatado = nomeCampo.charAt(0).toUpperCase() + nomeCampo.slice(1);
          return `${campoFormatado}: ${v.message}`;
        });        
      } else if (errorResponse?.error?.message) {
        this.erros = [errorResponse.error.message];
      } else {
        this.erros = [`Erro ao ${acao} disciplina.`];
      }
    };
     
    if (this.disciplina.id) {
      this.service.atualizar(this.disciplina).subscribe({
        next: () => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro atualizado com sucesso!';
          this.erros = null;
        },
        error: (errorResponse) => tratarErro(errorResponse, 'atualizar')
      });
    }
    
    else {
      this.service.salvar(this.disciplina).subscribe({
        next: (response) => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro realizado com sucesso!';
          this.erros = null;
          this.disciplina = response;
        },
        error: (errorResponse) => tratarErro(errorResponse, 'salvar')
      });
    }
  } 

  ngOnDestroy(): void {
    document.getElementById('layoutSidenav_content')?.classList.remove('semestre-ajuste');
  }
}