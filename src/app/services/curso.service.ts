import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../app/model/usuario';
import { Curso } from './../model/Curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  curso: Curso;  
  apiUrl: string = environment.apiUrlBase + '/api/cursos'

  constructor( private http: HttpClient) {  }  
  
  salvar(curso: Curso): Observable<Curso> {   
    console.log('Entrou no salva. Curso service: ', curso); 
    return this.http.post<Curso>(`${this.apiUrl}`, curso);
  }
  
  atualizar(curso: Curso): Observable<Curso> {
    console.log('Entrou no atualizar' , curso); 
    return this.http.put<Curso>(`${this.apiUrl}/${curso.id}`, curso);
  }  

  buscarCursos() : Observable<Curso[]> {   
    return this.http.get<Curso[]>(this.apiUrl);
  }
 
  buscarCursoPorId(id: number) : Observable<Curso> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }  

  deletar(curso: Curso) : Observable<any> {
    return this.http.delete<Usuario>(`${this.apiUrl}/${curso.id}`);
  }  
}

