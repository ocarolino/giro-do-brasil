import { Component, ViewChild, OnInit } from '@angular/core';
import { NewsService } from '../newsApi/news.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  providers: [ NewsService ]
})
export class NoticiasPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public lista_noticias = new Array<any>();
  public pagina:number = 1;
  public pagina_limite:number = 9999;

  constructor(public newsService:NewsService, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  carregaPagina() {
    this.newsService.getTopHeadlines(this.pagina, 'br').subscribe(
      data => {
        const response = (data as any);
        if (this.pagina == 1) {
          this.lista_noticias = response.articles;
        } else {
          this.lista_noticias = this.lista_noticias.concat(response.articles);
        }        

        this.pagina_limite = response.totalResults;

        console.log(this.lista_noticias);
        console.log(this.pagina_limite);
      },

      error => {
        console.log(error);
      }
    );
  }

  ionViewDidEnter() {
    this.efeitoLoading();
    this.carregaPagina();
  }

  async efeitoLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando notícias',
      spinner: 'crescent',
      duration: 1000
    });

    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  efeitoRefresh(event) {
    this.pagina = 1;
    this.carregaPagina();
    console.log('Iniciando operação assíncrona');

    setTimeout(() => {
      event.target.complete();
      this.infiniteScroll.disabled = false;
      console.log('Finalizando refresh');
    }, 500);
  }

  efeitoScrollInfinito(event) {
    this.pagina++;
    this.carregaPagina();
    setTimeout(() => {
      event.target.complete();
      console.log('Finalizando carregamento de página');

      if (this.lista_noticias.length == this.pagina_limite) {
        event.target.disabled = true;
        console.log('Desativando o scroll infinito.');
      }
    }, 1000);    
  }
}
