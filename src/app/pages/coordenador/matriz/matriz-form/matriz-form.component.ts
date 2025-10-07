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
            this.matrizCurricular = response;
          },
          error: (errorResponse) => {            
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
    if (!this.matrizCurricular.ativa) {
      this.sucesso = false;
      this.erros = ['Preencha todos os campos obrigatórios.'];
      return;
    } 
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
        this.erros = [`Erro ao ${acao} Matriz Curricular.`];
      }
    };
     
    if (this.matrizCurricular.id) {
      this.service.atualizar(this.matrizCurricular).subscribe({
        next: () => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro atualizado com sucesso!';
          this.erros = null;
        },
        error: (errorResponse) => tratarErro(errorResponse, 'atualizar')
      });
    }
    
    else {
      this.service.salvar(this.matrizCurricular).subscribe({
        next: (response) => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro realizado com sucesso!';
          this.erros = null;
          this.matrizCurricular = response;
        },
        error: (errorResponse) => tratarErro(errorResponse, 'salvar')
      });
    }
  } 

  ngOnDestroy(): void {
    document.getElementById('layoutSidenav_content')?.classList.remove('semestre-ajuste');
  }
}
