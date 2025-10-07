import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  standalone: true,
  selector: 'app-usuarios-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class UsuariosFormComponent implements OnInit {
  usuario: Usuario;
  sucesso: boolean = false;
  mensagemSucesso: string = '';
  erros: String[];
  id: number;

  constructor(
    private service: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.service.buscarUsuarioPorId(this.id).subscribe({
          next: (response) => {           
            this.usuario = response;
          },
          error: (errorResponse) => {            
            this.usuario = new Usuario();
          }
        });
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['administrador/usuario/lista'])
  }  

  onSubmit() {   
    if (!this.usuario.nome || !this.usuario.role) {
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
        this.erros = [`Erro ao ${acao} usuário.`];
      }
    };
     
    if (this.usuario.id) {
      this.service.atualizar(this.usuario).subscribe({
        next: () => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro atualizado com sucesso!';
          this.erros = null;
        },
        error: (errorResponse) => tratarErro(errorResponse, 'atualizar')
      });
    }
    
    else {
      this.service.salvar(this.usuario).subscribe({
        next: (response) => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro realizado com sucesso!';
          this.erros = null;
          this.usuario = response;
        },
        error: (errorResponse) => tratarErro(errorResponse, 'salvar')
      });
    }
  } 
}
