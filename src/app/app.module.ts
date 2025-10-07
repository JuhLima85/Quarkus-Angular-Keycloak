import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from '../app/shared/template/template.module';
import { HomeComponent } from './../app/pages/home/home.component';
import {UsuarioService} from './services/usuario.service';
import { LayoutComponent } from './../app/shared/componets/layout/layout.component';
import { AuthService } from './services/auth.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from '../app/shared/keycloak-init';
import { TokenInterceptor } from './token.interceptor';

//app.module.ts
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   LayoutComponent,    
  ],
  imports: [  
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,    
    FormsModule,     
    KeycloakAngularModule,    
  ],
  providers: [    
    UsuarioService,  
    AuthService,    
  {     
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, 
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
