import { Component, OnInit } from '@angular/core';
import { WebListServiceService } from '../service/web-list-service.service';
import { Produto } from '../model/idproduto';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  public idbusca: string;
  public idproduto: Produto[];
  public _idproduto: Produto;
  public lista: boolean;
  public _msgErro: string = null;

  constructor(private produtoBusca: WebListServiceService) { }

  ngOnInit() {
    this.pesquisarTodos();
  }

  public pesquisarTodos() {
      this._msgErro = "";
      this.lista = true
      this.produtoBusca.obterLista().subscribe((resultado: Produto[]) => {
        this.idproduto = resultado
        this.idbusca = "";
      })
    }

  public pesquisar() {
    if (this.idbusca == "") {
      this._msgErro = "Digite algum termo de busca";
    }
    else {
      this._msgErro = "";
      this.lista = false
      this.produtoBusca.obterListaPorId(this.idbusca).subscribe((resultado: Produto) => {
        this._idproduto = resultado;
        this.idbusca = "";

      })
    }
  }

}