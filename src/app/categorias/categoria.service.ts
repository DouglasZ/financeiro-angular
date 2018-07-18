import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { MoneyHttp } from '../seguranca/money-http';

@Injectable()
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: MoneyHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Promise<any> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AbWFpbC5jb206YWRtaW4=');

    return this.http.get(this.categoriasUrl)
      .toPromise()
      .then(response => response);
  }
}
