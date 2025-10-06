import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './administrador-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,   
   
  ], exports: []
})
export class AdministradorModule { } 
