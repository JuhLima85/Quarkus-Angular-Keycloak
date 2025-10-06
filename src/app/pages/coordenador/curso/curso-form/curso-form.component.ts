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
            this.curso = response;
          },
          error: (errorResponse) => {            
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
        this.erros = [`Erro ao ${acao} curso.`];
      }
    };
     
    if (this.curso.id) {
      this.service.atualizar(this.curso).subscribe({
        next: () => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro atualizado com sucesso!';
          this.erros = null;
        },
        error: (errorResponse) => tratarErro(errorResponse, 'atualizar')
      });
    }
    
    else {
      this.service.salvar(this.curso).subscribe({
        next: (response) => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro realizado com sucesso!';
          this.erros = null;
          this.curso = response;
        },
        error: (errorResponse) => tratarErro(errorResponse, 'salvar')
      });
    }
  } 

  ngOnDestroy(): void {
    document.getElementById('layoutSidenav_content')?.classList.remove('semestre-ajuste');
  }
}
