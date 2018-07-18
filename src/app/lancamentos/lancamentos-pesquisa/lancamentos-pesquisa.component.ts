import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/components/common/messageservice';

import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  // Pegamos a variável tabela do html
  @ViewChild('tabela') grid;

  constructor(private lancamentoService: LancamentoService,
              private errorHandler: ErrorHandlerService,
              private messageService: MessageService,
              private confirmation: ConfirmationService,
              private title: Title,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
      .then(() => {
        if (this.grid.value.length === 1) {
          this.grid.first = this.grid.first - this.grid.rows;
        } else {
          this.pesquisar(this.grid.first / this.grid.rows);
        }
        this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso.' });

      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
