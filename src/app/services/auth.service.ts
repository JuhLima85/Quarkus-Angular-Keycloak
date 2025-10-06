import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {}
  
  async isAutenticado(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }
 
  getRoles(): string[] {
    return this.keycloak.getUserRoles();
  }
  
  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }
  
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
  
  encerrarSessao() {
    this.keycloak.logout(window.location.origin);
  }
}


  
   
