/*import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of,  throwError} from 'rxjs';
import { Usuario } from '../model/usuario';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  constructor(private keycloak: KeycloakService) {}

  // Verifica se está logado
  async isAutenticado(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  // Retorna os roles do usuário logado
  getRoles(): string[] {
    return this.keycloak.getUserRoles();
  }

  // Verifica se o usuário tem um role específico
  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  // 🔹 Método equivalente ao antigo getUsuarioAutenticado
  async getUsuarioAutenticado() {
    if (await this.keycloak.isLoggedIn()) {
      const perfil = await this.keycloak.loadUserProfile();
      return {
        idUsuario: perfil.id,              // ID do Keycloak
        nomeUsuario: perfil.username,      // username
        nomeCompleto: perfil.firstName + ' ' + (perfil.lastName ?? ''), // nome completo
        email: perfil.email,
        roles: this.getRoles()
      };
    }
    return null;
  }

  // 🔹 Método equivalente ao encerrarSessao
  encerrarSessao() {
    this.keycloak.logout(window.location.origin); 
    // redireciona para home/login após logout
  }
}*/

import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {}

  // Verifica se o usuário está autenticado
  async isAutenticado(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  // Retorna as roles do usuário
  getRoles(): string[] {
    return this.keycloak.getUserRoles();
  }

  // Verifica se o usuário tem uma role específica
  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  // Retorna os dados do usuário a partir do token JWT
  async getUsuarioAutenticado() {
    if (await this.keycloak.isLoggedIn()) {
      const tokenParsed: any = this.keycloak.getKeycloakInstance().tokenParsed;

      return {
        idUsuario: tokenParsed.sub,
        nomeUsuario: tokenParsed.preferred_username,
        nomeCompleto: tokenParsed.name ?? '',
        email: tokenParsed.email ?? '',
        roles: this.getRoles()
      };
    }
    return null;
  }

  // Logout do Keycloak
  encerrarSessao() {
    this.keycloak.logout(window.location.origin);
  }
}


  
   
