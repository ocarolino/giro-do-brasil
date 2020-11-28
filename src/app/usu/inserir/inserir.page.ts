import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.page.html',
  styleUrls: ['./inserir.page.scss'],
})
export class InserirPage implements OnInit {
  public nome:string = "";
  public email:string = "";
  public senha:string = "";
  public mensagem:string = "";

  constructor(public autenticacaoService:AutenticacaoService, public router:Router, public toastController:ToastController) { }

  ngOnInit() {
  }

  insereUsuario() {
    if (this.nome.trim() || this.email.trim().length == 0 || this.senha.trim().length == 0) {
      this.mensagem = "Todos os campos são obrigatórios.";
      this.exibeMensagem();
      return;
    }

    this.autenticacaoService.insereNoFirebase(this.email, this.senha).then((res) => {
        this.autenticacaoService.atualizaNomeFirebase(this.nome);
        this.router.navigate(['home']);
      }).catch(
      (error) => {
        this.mensagem = "Erro ao concluir o cadastro";
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

  retornarLogin() {
    this.router.navigate(['login']);
  }
}
