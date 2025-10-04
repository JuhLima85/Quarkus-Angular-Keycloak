import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pessoa } from 'src/app/model/Pessoa';
//import { ClientesService } from 'src/app/services/clientes.service';
import { HistoricosService } from 'src/app/services/historicos.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent implements OnInit {

  pessoa: Pessoa;
  relacionamentos: any[];
  pessoasDisponiveis: Pessoa[] = [];   
  idFamiliar?: number;
  tipoParentesco: string = '';
  mensagemErro: string;
  mensagemSucesso: string = '';

  constructor(
    private router: Router,
    private historicoService: HistoricosService,
    //private clientesService: ClientesService  
  ) {}
  
  ngOnInit(): void {
    const nav = history.state;
    this.pessoa = nav.pessoa;

    this.listarTodos();      
    this.carregarRelacionamentos(); 
  }

  adicionarRelacionamento() {
    const id1 = this.pessoa.id;
    const id2 = this.idFamiliar;
    const tipo = this.tipoParentesco;

    if (!id1 || !id2 || !tipo) {
      this.mensagemSucesso = null; 
      this.mensagemErro = 'Preencha todos os campos para criar o vínculo.';
      return;
    }
    
    this.mensagemSucesso = null;
    this.mensagemErro = null;
    this.historicoService.criarVinculo(id1, id2, tipo).subscribe({
      next: (pessoaAtualizada) => {        
        this.pessoa = pessoaAtualizada; 
        this.idFamiliar = undefined;
        this.tipoParentesco = '';
        this.mensagemErro = null;    
        this.mensagemSucesso = 'Relacionamento Criado!';
        this.carregarRelacionamentos();
      },
      error: (err) => {
        this.mensagemSucesso = null;
        
        if (err.error && (err.error.mensagem || err.error.message)) {
          this.mensagemErro = err.error.mensagem || err.error.message;
        } else {
          this.mensagemErro = 'Erro ao criar vínculo. Tente novamente.';
        }        
      }
    });
  }

  listarTodos() {
    /*this.clientesService.buscarPessoas().subscribe({
      next: (resposta) => {        
        this.pessoasDisponiveis = resposta.filter(p => p.id !== this.pessoa.id);        
      },
      error: (err) => console.error('Erro ao buscar pessoas:', err)
    });*/
  }
  
  carregarRelacionamentos() {
    if (!this.pessoa?.id) return;
  
    this.historicoService.buscarRelacionamentos(this.pessoa.id).subscribe({
      next: (resposta) => {
        this.relacionamentos = resposta;        
      },
      error: (err) => console.error('Erro ao buscar relacionamentos:', err)
    });
  }
    
  voltarParaListagem() {
    this.router.navigate(['/clientes/lista']);
  }  
  
}

