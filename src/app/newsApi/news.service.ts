import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private chave = "albalb";
  private caminhoPadrao = "https://newsapi.org/v2";
  
  constructor(public http:HttpClient) { }

  public getTopHeadlines(page:number = 1, country:string = "br")
  {
    let noticias=`${this.caminhoPadrao}/top-headlines?country=${country}&apiKey=${this.chave}&page=${page}`;
    return this.http.get(noticias);
  }
}
