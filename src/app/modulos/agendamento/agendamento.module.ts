import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AgendamentoRoutingModule } from './agendamento-routing.module';
import { AgendamentoListComponent } from './agendamento-list/agendamento-list.component';
import { AgendamentoListFinalComponent } from './agendamento-list-final/agendamento-list-final.component';
import { AgendamentoSenhaComponent } from './agendamento-senha/agendamento-senha.component';


@NgModule({
  declarations: [AgendamentoListComponent, AgendamentoListFinalComponent, AgendamentoSenhaComponent],
  imports: [
    CommonModule,
    AgendamentoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AgendamentoModule { }
