import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Curso } from './../../../../model/Curso';
import { CursoService } from './../../../../services/curso.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class CursoListComponent  implements OnInit {
  cursos: Curso[] = [];  
  cursoSelecionado: Curso;
  mensagemSucesso: string;
  mensagemErro: string;
  
  constructor(
    private service: CursoService,    
    private router: Router,
    ) { }

  ngOnInit(): void {
    document.getElementById('layoutSidenav_content')?.classList.add('semestre-ajuste');
    this.service.buscarCursos().subscribe({
      next: (resposta) => {        
        this.cursos = resposta;
        console.log('Curso carregado pelo ID:', resposta);
      },
      error: (err) => console.error('Erro ao buscar Curso:', err)
    });
  }

  novoCadastro(){
    this.router.navigate(['/coordenador/curso/form'])
  }

  exibirUsuarioModalDelet(usuario: Curso){
    this.cursoSelecionado = usuario;
  }

  deletarCliente(){
    this.service
    .deletar(this.cursoSelecionado)
    .subscribe(
      response => {
        this.mensagemSucesso = 'Usuário deletado com sucesso!'
        this.ngOnInit();
                  },
      erro => this.mensagemErro = 'Ocorreu um erro ao deletar o usuário.')
  }  

carregarHistorico(id: number): void { 
  this.service.buscarCursoPorId(id).subscribe({
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

ngOnDestroy(): void {    
  document.getElementById('layoutSidenav_content')?.classList.remove('semestre-ajuste');
}
}
