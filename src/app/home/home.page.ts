import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../usuario/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private autenticacaoService:AutenticacaoService, private router:Router) { }

  ngOnInit() {
  }
  
  ionViewDidEnter() {
    console.log(this.autenticacaoService.logado);

    if (this.autenticacaoService.logado == false) {
      this.router.navigate(['login']);
    }
  }
  
}
