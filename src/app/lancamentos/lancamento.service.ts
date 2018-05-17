import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';
import { Lancamento } from '../core/model';

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

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const params = new URLSearchParams();

    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());


    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataInicial) {
      params.set('dataInicial', moment(filtro.dataInicial).format('YYYY-MM-DD'));
    }

    if (filtro.dataFinal) {
      params.set('dataFinal', moment(filtro.dataFinal).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { search: params })
      .toPromise()
      .then(response => {

        return {
          lancamentos: response.json().content,
          total: response.json().totalElements
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

    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');
    // headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.lancamentosUrl}/${lancamento.id}`,
      JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;

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
