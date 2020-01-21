import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-faq',
  templateUrl: './form-faq.component.html',
  styleUrls: ['./form-faq.component.css']
})
export class FormFaqComponent implements OnInit {
  private nome: string;
  private email: string;
  private tel: string;
  private msg: any;
  private filtro: any = /^([a-zA-zà-úÀ-Ú]|\s+)+$/;
  private num: any = /^[0-9]+$/;
  private _msgErroN: string = null;
  private _msgErroS: string = null;
  private _msgErroE: string = null;
  private _msgErroT: string = null;

  constructor() { }

  ngOnInit() {
  }

  validacao() {
    if (this.nome == "" || this.email == "" || this.tel == null || this.msg == "" || this.nome == null || this.email == null || this.msg == null) {
      alert('Preencha todos os campos');
    }
    if (!this.filtro.test(this.nome)) {
      this.nome = "";
      this._msgErroN = "Dado inválido";
    }
    else {
      this._msgErroN = null;
    }
    if (this.email.indexOf("@") == -1 && this.email.indexOf("@") > 1 || this.email.indexOf(".") == -1) {
      this.email = "";
      this._msgErroE = "Dado inválido";
    }
    else {
      this._msgErroE = null;
    }

    if (this.tel.length < 10 || !this.num.test(this.tel)) {
      this.tel = null;
      this._msgErroT = `Digite um telefone válido`;
    }
    else {
      this._msgErroT = null;
    }
  }
}
