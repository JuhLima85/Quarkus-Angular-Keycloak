import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,  Router} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { 

  constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const autenticado = await this.authService.isAutenticado();
  
    if (!autenticado) {
      this.router.navigate(['/login']);
      return false;
    }
  
    const rolesNecessarias = route.data['roles'] as string[];
    if (rolesNecessarias && !rolesNecessarias.some(r => this.authService.hasRole(r))) {
      this.router.navigate(['/acesso-negado']);
      return false;
    }
  
    return true;
  }   
}
