import { Component, OnInit } from '@angular/core';
import { Globals } from '../model/login';
import { usuario } from '../model/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ Globals ]
})
export class NavbarComponent implements OnInit {
  usuario: usuario;
  private login:string = "";
  constructor() { }

  ngOnInit() {
    if(Globals.USUARIO){
      this.login = "Logout";
      this.usuario = Globals.USUARIO;
    }
    else{
      this.login = "Login";
    }
    
  }

}
