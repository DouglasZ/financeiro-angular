import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pessoa } from '../../core/model';
import { PessoaService } from '../pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  pessoaId = null;

  constructor(private pessoaService: PessoaService,
              private toasty: ToastyService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title) {
  }

  ngOnInit() {

    this.title.setTitle('Nova pessoa');

    this.pessoaId = this.route.snapshot.params['id'];

    if (this.pessoaId) {
      this.carregarPessoa(this.pessoaId);
    }
  }

  get editando() {
    return Boolean(this.pessoaId);
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscarPorCodigo(id)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoa => {
        this.toasty.success('Pessoa adicionada com sucesso.');
        this.router.navigate(['/pessoas', pessoa.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.toasty.success('Pessoa alterada com sucesso.');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }
}
