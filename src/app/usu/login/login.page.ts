import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email:string = "";
  public senha:string = "";
  public mensagem:string = "";

  constructor(public autenticacaoService:AutenticacaoService, public router:Router, public toastController:ToastController) { }

  ngOnInit() {
  }
  
  loginUsuario() {
    if (this.email.trim().length == 0 || this.senha.trim().length == 0) {
      this.mensagem = "O usuário e senha são obrigatórios";
      this.exibeMensagem();
      return;
    }

    this.autenticacaoService.loginNoFireBase(this.email, this.senha).then(
      (res) => {
        this.router.navigate(['home']);
      }
    ).catch(
      (error) => {
        this.mensagem = "Usuário e/ou senha inválidos";
        this.exibeMensagem();
      }
    );
  }

  async exibeMensagem() {
    const toast = await this.toastController.create({
      message: this.mensagem,
      duration: 2000
    });

    toast.present();
  }

  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';

  esconderMostrarSenha() {
    console.log("teste");
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
