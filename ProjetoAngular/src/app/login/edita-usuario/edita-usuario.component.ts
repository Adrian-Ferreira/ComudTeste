import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebListServiceService } from '../../service/web-list-service.service';
import { usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-edita-usuario',
  templateUrl: './edita-usuario.component.html',
  styleUrls: ['./edita-usuario.component.css']
})
export class EditaUsuarioComponent implements OnInit {

  public usuario:usuario = new usuario;
  private _msgEnviar: string = null;
  private _msgEnviarE: string = null;
  private _msgErroSFA: string = null;
  private _msgErroSFO: string = null;

  /*private nome: string;
  private email: string;
  private tel: string;
  private senha: string;
  private confSenha: string;*/

  private filtro: any = /^([a-zA-zà-úÀ-Ú]|\s+)+$/;
  private num: any = /^[0-9]+$/;
  private carEsp: any = /[@#$%&]/;
  private numFiltro: any = /[^0-9A-Za-z]*/;

  private _msgErroN: string = null 
  private _msgErroE: string = null 
  private _msgErroT: string = null 
  private _msgErroS: string = null;
  private _msgErroCS: string = null;

  /*private _msgErroSFA: string = null;
  private _msgErroSFO: string = null;
  private _msgEnviar: string = null;
  private _msgEnviarE: string = null;*/

  private id: number;

  constructor(private rota: ActivatedRoute, private srv: WebListServiceService) { }

  ngOnInit() {
    this.id = this.rota.snapshot.params["id"];
    
    this.srv.recuperaDetalhe(this.id).subscribe((res:usuario)=>{
      this.usuario = res;

    });
  }

  validacao(){

    if (this.usuario.nome == "" || this.usuario.email == "" || this.usuario.telefone == null || this.usuario.senha == "") {
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

    this._msgEnviar = null;
    this._msgEnviarE = null;
    if (this.usuario.nome != "" && this.usuario.email != "" && this.usuario.telefone != null && this.usuario.senha != "") {
      this.srv.atualiza(this.usuario).subscribe(res=>{
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

  

