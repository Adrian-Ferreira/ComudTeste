import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/model/usuario';
import { WebListServiceService } from 'src/app/service/web-list-service.service';

@Component({
  selector: 'app-modal-cad',
  templateUrl: './modal-cad.component.html',
  styleUrls: ['./modal-cad.component.css']
})
export class ModalCadComponent implements OnInit {

  public usuario:usuario = new usuario;
  private _msgEnviar: string = null;
  private _msgEnviarE: string = null;
  private _msgErroSFA: string = null;
  private _msgErroSFO: string = null;

  private filtro: any = /^([a-zA-zà-úÀ-Ú]|\s+)+$/;
  private num: any = /^[0-9]+$/;
  private carEsp: any = /[@#$%&]/;
  private numFiltro: any = /[^0-9A-Za-z]*/;

  private _msgErroN: string = null 
  private _msgErroE: string = null 
  private _msgErroT: string = null 
  private _msgErroS: string = null;
  private _msgErroCS: string = null;

  constructor(private srv: WebListServiceService) { }

  ngOnInit() {
  }

  validacao(){

    if (this.usuario.nome == "" || this.usuario.email == "" || this.usuario.telefone == null || this.usuario.senha == "" || this.usuario.confSenha == "") {
      alert('Preencha todos os campos');  
    }

    if (!this.filtro.test(this.usuario.nome) || this.usuario.nome.indexOf(" ") < 1) {
      this.usuario.nome = "";
      this._msgErroN = "Dado inválido";
    }
    else {
      this._msgErroN = null;
    }

    if (this.usuario.email.indexOf("@") == -1 && this.usuario.email.indexOf("@") > 1 || this.usuario.email.indexOf(".") == -1) {
      this.usuario.email = "";
      this._msgErroE = "Dado inválido";
    }
    else {
      this._msgErroE = null;
    }

    if (this.usuario.telefone.length < 10 || !this.num.test(this.usuario.telefone)) {
      this.usuario.telefone = null;
      this._msgErroT = `Digite um telefone válido`;
    }
    else {
      this._msgErroT = null;
    }

    if (this.usuario.senha.length < 10) {
      this._msgErroSFA = null;
      this._msgErroSFO = null;
      this.usuario.senha ="";
      this._msgErroS = `A senha deve conter no minimo 10 caracteres`;
    }
    else {
      this._msgErroS = null;
    }
    
    if(this.usuario.confSenha === this.usuario.senha){
      this._msgErroCS = null;
    }
    else{
      this.usuario.confSenha= "";
      this._msgErroCS = "As senhas nâo conferem";
    }

    if (this.usuario.nome != "" && this.usuario.email != "" && this.usuario.telefone != null && this.usuario.senha != "" && this.usuario.confSenha != "") {
      this._msgEnviar = null;
      this._msgEnviarE = null;
      this.srv.inserir(this.usuario).subscribe(res=>{
        this._msgEnviar = "Dados enviados com SUCESSO!!";
        this.usuario.nome = "";
        this.usuario.email = "";
        this.usuario.telefone = null;
        this.usuario.senha = "";
        this.usuario.confSenha = "";
        this._msgErroSFA = null;
        this._msgErroSFO = null;
      },
      error=>{
        this._msgEnviarE = "Erro ao enviar dados!!";
      })
      
    }
  }

  vSenha(){
    if(this.carEsp.test(this.usuario.senha) && this.usuario.senha.length >= 10){
      this._msgErroS = null;
      this._msgErroSFA = null;
      this._msgErroSFO = "Senha forte";
    }
    else if (this.filtro.test(this.usuario.senha) || this.num.test(this.usuario.senha) || this.numFiltro.test(this.usuario.senha)){
      this._msgErroS = null;
      this._msgErroSFO = null;
      this._msgErroSFA = "Senha fraca";
    }
    else{
      this._msgErroSFA = null;
      this._msgErroSFO = null;
    }
  }

  limpaEnviar(){
    this._msgEnviar = null;
    this._msgEnviarE = null;
  }
}