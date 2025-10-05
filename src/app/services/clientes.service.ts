import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../app/model/usuario';
import { Pessoa } from '../model/Pessoa';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {  
  usuario: Usuario;  
  apiUrl: string = environment.apiUrlBase + '/api/usuarios'
  //apiUrlServico: string = environment.apiUrlBase + '/api/servicos-prestados'  

  constructor( private http: HttpClient) {  }  
  
  salvar(usuario: Usuario): Observable<Usuario> {   
    console.log('Entrou no salva. Usuario service: ', usuario); 
    return this.http.post<Usuario>(`${this.apiUrl}`, usuario);
  }
  
  atualizar(usuario: Usuario): Observable<Usuario> {
    console.log('Entrou no atualizar' , usuario); 
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
  }    

  //apagar
  buscarPessoas() : Observable<Pessoa[]> {   
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  buscarUsuarios() : Observable<Usuario[]> {   
    return this.http.get<Usuario[]>(this.apiUrl);
  }
 
  buscarUsuarioPorId(id: number) : Observable<Usuario> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }  

  // Editar
  deletar(cliente: Usuario) : Observable<any> {
    return this.http.delete<Usuario>(`${this.apiUrl}/${cliente.id}`);
  }  
}
 