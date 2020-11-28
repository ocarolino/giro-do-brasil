import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  public usuarioDados:any;
  public nome:string = "";
  public email:string = "";
  public logado:boolean = false;

  constructor(public ngFireAuth:AngularFireAuth) {
    this.usuarioDados = null;

    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.usuarioDados = user;
        this.nome = this.usuarioDados.displayName;
        this.email = this.usuarioDados.email;
        this.logado = true; 
      } else {
        this.usuarioDados = null;
        this.logado = false;
      }
    });
  }

  loginNoFireBase(email:string, password:string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  logoffNoFireBase() {
    return this.ngFireAuth.signOut();
  }

  insereNoFirebase(email:string, password:string) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  async atualizaNomeFirebase(nome:string) {
    (await this.ngFireAuth.currentUser).updateProfile({displayName: nome}).then(() => {
      this.nome = nome;
    }).catch((err) => { 
      console.log('Erro ao atualizar nome do usuário: ' + err);
    });
  }

  get estaLogado() {
    return this.logado;
  }
}
