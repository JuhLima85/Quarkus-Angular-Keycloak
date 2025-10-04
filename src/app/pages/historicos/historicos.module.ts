import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HistoricosRoutingModule } from './historicos-routing.module';
import { HistoricoComponent } from './historico/historico.component';

@NgModule({
  declarations: [
    HistoricoComponent
  ],
  imports: [  
  CommonModule, 
  FormsModule,  
  HistoricosRoutingModule
  ], exports: [
    HistoricoComponent
  ]
})
export class HistoricosModule { }
