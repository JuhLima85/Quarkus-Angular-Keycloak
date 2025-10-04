import { PessoaDto } from 'src/app/model/PessoaDto';
import { RelacionamentoDto } from 'src/app/model/RelacionamentoDto';

export interface HistoricoDto {
    cadastro: PessoaDto;
    relacionamentos: RelacionamentoDto[];
  }
  