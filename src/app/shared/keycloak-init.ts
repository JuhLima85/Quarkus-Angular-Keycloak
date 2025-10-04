/*import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081',   // URL do seu Keycloak
        realm: 'unifor',                     // seu Realm
        clientId: 'frontend-unifor'          // seu Client ID
      },
      initOptions: {
        onLoad: 'login-required',          // força login no início
        checkLoginIframe: false,
        pkceMethod: 'S256'
      }
    });
}*/

import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081',
        realm: 'unifor',
        clientId: 'frontend-unifor'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        pkceMethod: 'S256',
        // permite revalidar a sessão sem novo login
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

