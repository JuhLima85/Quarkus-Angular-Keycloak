import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../app/model/usuario';
import { Pessoa } from '../model/Pessoa';
import { RelacionamentoDto } from '../model/RelacionamentoDto';

@Injectable({
  providedIn: 'root'
})
export class HistoricosService {

  usuario: Usuario;  
  apiUrl: string = environment.apiUrlBase + '/pessoas'
  apiUrlParentescos: string = environment.apiUrlBase + '/parentescos'  

  constructor( private http: HttpClient) {  }  

  criarVinculo(id1: number, id2: number, tipo: string): Observable<Pessoa> {
    return this.http.post<Pessoa>(
      `${this.apiUrl}/${id1}/vinculo/${id2}?tipo=${tipo}`, 
      {}
    );
  }

  buscarRelacionamentos(id: number): Observable<RelacionamentoDto[]> {
    return this.http.get<RelacionamentoDto[]>(`${this.apiUrlParentescos}/pessoa/${id}/relacionamentos`);
  }
}
