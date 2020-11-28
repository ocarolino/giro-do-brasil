import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AutenticacaoService } from './usuario/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Início',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'Noticias',
      url: 'noticias',
      icon: 'newspaper-outline'
    },
    {
      title: 'Localização',
      url: 'mapa',
      icon: 'navigate-circle'
    }
  ];

  public nome:string = "";
  public email:string = "";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private autenticacaoService:AutenticacaoService,
    public router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#000000');
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  deslogarUsuario() {
    this.autenticacaoService.logoffNoFireBase();
    this.nome = this.autenticacaoService.nome;
    this.email = this.autenticacaoService.email;
    this.router.navigate(['login']);
  }

  atualizarMenu() {
    console.log('abriu o menu');
    this.nome = this.autenticacaoService.nome;
    this.email = this.autenticacaoService.email;
  }
}
