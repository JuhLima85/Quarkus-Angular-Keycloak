export interface PessoaDto {
    idPessoa: number;
    pessoaNome: string;
    pessoaFone: string;
    pessoaEmail: string;
    pessoaData?: string;
    pessoaCep?: string;
    pessoaLogradouro?: string;
    pessoaBairro?: string;
    pessoaLocalidade?: string;
    pessoaUf?: string;
    pessoaMembro: boolean;
  }
  