import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Disciplina } from './../model/Disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  disciplina: Disciplina;  
  apiUrl: string = environment.apiUrlBase + '/api/disciplinas'
  
  constructor( private http: HttpClient) {  }  
  
  salvar(disciplina: Disciplina): Observable<Disciplina> {   
    console.log('Entrou no salva. Usuario service: ', disciplina); 
    return this.http.post<Disciplina>(`${this.apiUrl}`, disciplina);
  }
  
  atualizar(disciplina: Disciplina): Observable<Disciplina> {
    console.log('Entrou no atualizar' , disciplina); 
    return this.http.put<Disciplina>(`${this.apiUrl}/${disciplina.id}`, disciplina);
  }    

  buscarDisciplinas() : Observable<Disciplina[]> {   
    return this.http.get<Disciplina[]>(this.apiUrl);
  }
 
  buscarDisciplinaPorId(id: number) : Observable<Disciplina> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }  

  deletar(disciplina: Disciplina) : Observable<any> {
    return this.http.delete<Disciplina>(`${this.apiUrl}/${disciplina.id}`);
  }  
}