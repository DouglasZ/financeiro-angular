import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { SharedModule } from '../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.modele';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,
    DataTableModule,
    InputMaskModule,
    InputTextModule,
    TooltipModule,

    SharedModule,

    PessoasRoutingModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  exports: []
})
export class PessoasModule { }
