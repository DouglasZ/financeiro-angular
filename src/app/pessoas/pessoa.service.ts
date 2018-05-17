import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { Pessoa, Estado, Cidade } from '../core/model';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { search: params })
      .toPromise()
      .then(response => {
        return {
          pessoas: response.json().content,
          total: response.json().totalElements
        };
      });
  }

  listarTodas(): Promise<any> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(id: number): Promise<void> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    return this.http.delete(`${this.pessoasUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(id: number, ativo: boolean): Promise<void> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');
    // headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');
    // headers.append('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');
    // headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${pessoa.id}`,
      JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json() as Pessoa);
  }

  buscarPorCodigo(id: number): Promise<Pessoa> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    return this.http.get(`${this.pessoasUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Pessoa);
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get(this.estadosUrl)
      .toPromise()
      .then(response => response.json());
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    const params = new URLSearchParams();
    params.set('estado', estado);
    return this.http.get(this.cidadesUrl, { search: params })
      .toPromise()
      .then(response => response.json());
  }
}
