import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from 'src/app/services/clientes.service';
import { ClienteServicoDtoService } from 'src/app/services/cliente-servico-dto.service';
import { HistoricosService } from 'src/app/services/historicos.service';
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
    private clienteServicoDtoService: ClienteServicoDtoService,
    private historicoService: HistoricosService,    
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.service.buscarUsuarios().subscribe({
      next: (resposta) => {        
        this.usuarios = resposta;
        console.log('Usuário carregado pelo ID:', resposta);
      },
      error: (err) => console.error('Erro ao buscar usuários:', err)
    });
  }

  novoCadastro(){
    this.router.navigate(['/usuario/form'])
  }

  exibirUsuarioModalDelet(usuario: Usuario){
    this.usuarioSelecionado = usuario;
  }

  deletarCliente(){
    this.service
    .deletar(this.usuarioSelecionado)
    .subscribe(
      response => {
        this.mensagemSucesso = 'Usuário deletado com sucesso!'
        this.ngOnInit();
                  },
      erro => this.mensagemErro = 'Ocorreu um erro ao deletar o usuário.')
  }  

carregarHistorico(id: number): void { 
  this.service.buscarUsuarioPorId(id).subscribe({
    next: (usuario) => {      
      this.router.navigate(['/historicos/visualizar-historico'], {
        state: {
          usuario: usuario               
        }
      });      
      this.mensagemErro = null; 
    },
    error: () => {
      this.mensagemErro = 'Ocorreu um erro ao carregar o histórico.';
      this.mensagemSucesso = null; 
    }
  });
}
}
