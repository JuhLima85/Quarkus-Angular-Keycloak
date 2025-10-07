import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
standalone: true,
selector: 'app-usuarios-lista',
templateUrl: './usuario-lista.component.html',
styleUrls: ['./usuario-lista.component.css'],
imports: [CommonModule, RouterModule, FormsModule]
})
export class ClientesListaComponent implements OnInit {
  usuarios: Usuario[] = [];  
  usuarioSelecionado: Usuario;
  mensagemSucesso: string;
  mensagemErro: string;
  
  constructor(
    private service: UsuarioService,     
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.service.buscarUsuarios().subscribe({
      next: (resposta) => {        
        this.usuarios = resposta;        
      },
      error: (err) => console.error('Erro ao buscar usuários:', err)
    });
  }

  novoCadastro(){
    this.router.navigate(['administrador/usuario/form'])
  }

  exibirUsuarioModalDelet(usuario: Usuario){
    this.usuarioSelecionado = usuario;
  }

  deletarUsuario(){
    this.service
    .deletar(this.usuarioSelecionado)
    .subscribe(
      response => {
        this.mensagemSucesso = 'Usuário deletado com sucesso!'
        this.ngOnInit();
                  },
      erro => this.mensagemErro = 'Ocorreu um erro ao deletar o usuário.')
  }  
}
