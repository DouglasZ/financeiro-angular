import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/components/button/button';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { SharedModule } from '../shared/shared.module';
import { LancamentosRoutingModele } from './lancamentos-routing.modele';

@NgModule({
  imports: [
    CommonModule,

    ButtonModule,
    CalendarModule,
    CurrencyMaskModule,
    DataTableModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    SelectButtonModule,
    TooltipModule,

    SharedModule,

    LancamentosRoutingModele
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  exports: []
})
export class LancamentosModule {
}
