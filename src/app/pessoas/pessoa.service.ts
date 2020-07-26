import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';



import { Pessoa, Estado, Cidade } from '../core/model';
import { MoneyHttp } from '../seguranca/money-http';

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

  constructor(private http: MoneyHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.pessoasUrl}`, { params })
      .toPromise()
      .then(response => {
        return {
          pessoas: response.content,
          total: response.totalElements
        };
      });
  }

  listarTodas(): Promise<any> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    return this.http.get<any>(this.pessoasUrl)
      .toPromise()
      .then(response => response.content);
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

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');
    // headers.append('Content-Type', 'application/json');
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers })
      .toPromise()
      .then(response => response);
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');
    // headers.append('Content-Type', 'application/json');

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.id}`,
      JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response);
  }

  buscarPorCodigo(id: number): Promise<Pessoa> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    return this.http.get<Pessoa>(`${this.pessoasUrl}/${id}`)
      .toPromise()
      .then(response => response);
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl)
      .toPromise()
      .then(response => response);
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    const params = new HttpParams().append('estado', estado);

    return this.http.get<Cidade[]>(this.cidadesUrl, { params })
      .toPromise()
      .then(response => response);
  }
}
