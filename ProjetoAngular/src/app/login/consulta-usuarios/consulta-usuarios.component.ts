import { Component, OnInit } from '@angular/core';
import { WebListServiceService } from '../../service/web-list-service.service';
import { usuario } from '../../model/usuario';
import { Globals } from '../../model/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-usuarios',
  templateUrl: './consulta-usuarios.component.html',
  styleUrls: ['./consulta-usuarios.component.css'],
  providers: [Globals]
})

export class ConsultaUsuariosComponent implements OnInit {

  public listaUser: usuario[];

  usuario: usuario;

  constructor(private router: Router, private srv: WebListServiceService ) { }

  ngOnInit() {
    if (!Globals.USUARIO) {
      alert("Você precisa estar logado para acessar esta página");
      this.router.navigate(['/login']
      );
    }
    else {
      this.usuario = Globals.USUARIO;
    }

    this.srv.recuperaTodos().subscribe((resp: usuario[]) => {
      this.listaUser = resp;
    });
  }
}
