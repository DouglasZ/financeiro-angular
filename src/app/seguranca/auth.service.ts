import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { environment } from '../../environments/environment';

import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(private http: Http,
              private jwtHelper: JwtHelper) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    // withCredentials envia e recebe credenciais
    // Usamos o withCredentials para que o Cookies não seja ignorado pelo navegador
    // Pois estamos fazendo uma requisição Cross-site (API port 8080 e Front port 4200)
    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          const responseJson = response.json();

          if (responseJson.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida.');
          }
        }

        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    // withCredentials envia e recebe credenciais
    // Usamos o withCredentials para que o Cookies não seja ignorado pelo navegador
    // Pois estamos fazendo uma requisição Cross-site (API port 8080 e Front port 4200)
    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);

        console.log('Novo access token criado.');
        return Promise.resolve(null);
      })
      .catch(response => {
        console.log('Erro ao renovar token. ', response);
        return Promise.resolve(null);
      });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
