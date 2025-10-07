import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Semestre } from './../model/Semestre';

@Injectable({
  providedIn: 'root'
})
export class SemestreService {
  
  semestre: Semestre;  
  apiUrl: string = environment.apiUrlBase + '/api/semestres';  

  constructor( private http: HttpClient) {  }  
  
  salvar(semestre: Semestre): Observable<Semestre> {   
    console.log('Entrou no salva. Usuario service: ', semestre); 
    return this.http.post<Semestre>(`${this.apiUrl}`, semestre);
  }
  
  atualizar(semestre: Semestre): Observable<Semestre> {
    console.log('Entrou no atualizar' , semestre); 
    return this.http.put<Semestre>(`${this.apiUrl}/${semestre.id}`, semestre);
  }    

  buscarSemestres() : Observable<Semestre[]> {   
    return this.http.get<Semestre[]>(this.apiUrl);
  }
 
  buscarSemestrePorId(id: number) : Observable<Semestre> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }  

  deletar(cliente: Semestre) : Observable<any> {
    return this.http.delete<Semestre>(`${this.apiUrl}/${cliente.id}`);
  }  
}
