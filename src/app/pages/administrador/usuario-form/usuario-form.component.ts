import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../services/clientes.service';

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
            console.log('Usuario carregado pelo ID:', response);
            this.usuario = response;
          },
          error: (errorResponse) => {
            console.error('Erro ao buscar usuario:', errorResponse);
            this.usuario = new Usuario();
          }
        });
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/usuario/lista'])
  }
  
  onSubmit() {
    console.error('Usuario onSubmit:', this.usuario);
    if (!this.usuario.nome || !this.usuario.role) {
      this.sucesso = false;
      this.erros = ['Preencha todos os campos obrigatórios.'];
      return;
    }
    if (this.usuario.id) {
      this.service
        .atualizar(this.usuario)
        .subscribe(response => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro atualizado com sucesso!';
          this.erros = null;
        }, erroResponse => {
          this.erros = ['Erro ao atualizar usuário.']
        })
    } else {
      this.service.salvar(this.usuario).subscribe({
        next: (response) => {
          this.sucesso = true;
          this.mensagemSucesso = 'Cadastro realizado com sucesso!';
          this.erros = null;
          this.usuario = response;
          console.log('Response: ', response);
        },
        error: (errorResponse) => {
          console.error("Erro completo recebido da API:", errorResponse);

          if (errorResponse.error && errorResponse.error.message) {
            this.erros = [errorResponse.error.message];
          } else {
            this.erros = ['Erro ao salvar usuário.'];
          }
          console.log('Erro final exibido: ', this.erros);
          this.sucesso = false;
        }
      });
    }
  }
}
