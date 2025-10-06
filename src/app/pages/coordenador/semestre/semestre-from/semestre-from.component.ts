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
            this.semestre = response;
          },
          error: (errorResponse) => {            
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
        this.erros = [`Erro ao ${acao} semestre.`];
      }
    };
     
    if (this.semestre.id) {
      this.service.atualizar(this.semestre).subscribe({
        next: () => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro atualizado com sucesso!';
          this.erros = null;
        },
        error: (errorResponse) => tratarErro(errorResponse, 'atualizar')
      });
    }
    
    else {
      this.service.salvar(this.semestre).subscribe({
        next: (response) => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro realizado com sucesso!';
          this.erros = null;
          this.semestre = response;
        },
        error: (errorResponse) => tratarErro(errorResponse, 'salvar')
      });
    }
  } 

  ngOnDestroy(): void {
    document.getElementById('layoutSidenav_content')?.classList.remove('semestre-ajuste');
  }
}
