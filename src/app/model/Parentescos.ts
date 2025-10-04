import { Pessoa } from './Pessoa';

export class Parentesco {
  id?: number;
  tipo: string = '';
  pessoa?: Pessoa;               // a pessoa "dona" do relacionamento
  pessoaRelacionada?: Pessoa;    // o familiar (pai, mãe, irmão etc.)

  constructor(init?: Partial<Parentesco>) {
    Object.assign(this, init);
  }
}
