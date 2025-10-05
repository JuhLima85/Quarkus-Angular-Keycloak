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


  
   
