import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';


import * as moment from 'moment';
import { Lancamento } from '../core/model';
import { MoneyHttp } from '../seguranca/money-http';

export class LancamentoFiltro {
  descricao: string;
  dataInicial: Date;
  dataFinal: Date;

  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: MoneyHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.dataInicial) {
      params = params.append('dataInicial', moment(filtro.dataInicial).format('YYYY-MM-DD'));
    }

    if (filtro.dataFinal) {
      params = params.append('dataFinal', moment(filtro.dataFinal).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.lancamentosUrl}?resumo`, { params })
      .toPromise()
      .then(response => {

        return {
          lancamentos: response.content,
          total: response.totalElements
        };
      });
  }

  excluir(id: number): Promise<void> {

    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    return this.http.delete(`${this.lancamentosUrl}/${id}`)
      .toPromise()
      .then(() => null);

  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {

    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');
    // headers.append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
      .toPromise()
      .then(response => response);
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');
    // headers.append('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.id}`,
      lancamento)
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}
