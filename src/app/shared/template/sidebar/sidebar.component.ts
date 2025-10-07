import { Component, OnInit } from '@angular/core';
import { Router, RouterModule  } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuarioLogado: any;   
  isSidebarVisible: boolean = true; 

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
 
  async ngOnInit(): Promise<void> {   
    const usuarioSalvo = sessionStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      this.usuarioLogado = JSON.parse(usuarioSalvo);      
    } else {     
      this.usuarioLogado = await this.authService.getUsuarioAutenticado();
      if (this.usuarioLogado) {       
        sessionStorage.setItem('usuarioLogado', JSON.stringify(this.usuarioLogado));        
      }
    }
  }

  logout() {   
    sessionStorage.removeItem('usuarioLogado');
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }
 
  hideSidebar(): void {
    this.isSidebarVisible = false;
}
temRole(role: string): boolean {
  if (!this.usuarioLogado || !this.usuarioLogado.roles) return false;
  return this.usuarioLogado.roles.some(r => r.includes(role));
}
}