import { Parentesco } from "./Parentescos";

export class Pessoa {
    id?: number;
    nome: string = '';
    fone: string = '';
    email: string = '';
    data: string = '';        // dd/MM/yyyy (ou ISO se preferir)
    cep: string = '';
    logradouro: string = '';
    bairro: string = '';
    localidade: string = '';
    uf: string = '';
    membro: boolean;
  
    parentescos: Parentesco[] = []; 
  
    constructor(init?: Partial<Pessoa>) {
      Object.assign(this, init);
    }
  }