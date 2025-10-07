import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { MatrizCurricular } from './../model/MatrizCurricular';

@Injectable({
  providedIn: 'root'
})
export class MatrizService {  
  matrizCurricular: MatrizCurricular;  
  apiUrl: string = environment.apiUrlBase + '/api/matrizes'  

  constructor( private http: HttpClient) {  }  
  
  salvar(matrizCurricular: MatrizCurricular): Observable<MatrizCurricular> {   
    console.log('Entrou no salva. matrizCurricular service: ', matrizCurricular); 
    return this.http.post<MatrizCurricular>(`${this.apiUrl}`, matrizCurricular);
  }
  
  atualizar(matrizCurricular: MatrizCurricular): Observable<MatrizCurricular> {
    console.log('Entrou no atualizar' , matrizCurricular); 
    return this.http.put<MatrizCurricular>(`${this.apiUrl}/${matrizCurricular.id}`, matrizCurricular);
  }    

  buscarMatrizCurricular() : Observable<MatrizCurricular[]> {   
    return this.http.get<MatrizCurricular[]>(this.apiUrl);
  }
 
  buscarMatrizCurricularPorId(id: number) : Observable<MatrizCurricular> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }  
  
  deletar(cliente: MatrizCurricular) : Observable<any> {
    return this.http.delete<MatrizCurricular>(`${this.apiUrl}/${cliente.id}`);
  }  
}
