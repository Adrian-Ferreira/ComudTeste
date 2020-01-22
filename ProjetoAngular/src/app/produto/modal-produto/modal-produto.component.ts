import { Component, OnInit } from '@angular/core';
import { WebListServiceService } from '../../service/web-list-service.service';
import { Produto } from '../../model/idProduto';

@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.css']
})
export class ModalProdutoComponent implements OnInit {

  public idbuscarOne: string;
  public idproduto: Produto[];
  public _idproduto: Produto;
  public lista: boolean;
  public _msgErro: string = null;

  constructor(private produtoBusca: WebListServiceService) { }

  ngOnInit() {
    
  }

  

}
