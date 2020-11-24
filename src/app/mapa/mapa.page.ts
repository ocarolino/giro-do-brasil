import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
  
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  constructor(private geoLocation: Geolocation) { }

  map:Map;
  newMarker:any;
  
  ngOnInit() {
  }

  ionViewDidEnter(){
    this.loadMap();
  }

  loadMap() {
    this.map = new Map("mapId").setView([-22.8671429, -43.2538754], 13);

    tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { 
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY - SA</a>'
      }).addTo(this.map);
  }    

  pegarLocalizacao() {
    this.geoLocation.getCurrentPosition().then(
      (resp) => {
        this.map.setView([resp.coords.latitude, resp.coords.longitude], 15);
        this.newMarker = marker([resp.coords.latitude, resp.coords.longitude], { draggable: false }).addTo(this.map);
        this.newMarker.bindPopup("Você está aqui!").openPopup();

        console.log(resp.coords.latitude + " " + resp.coords.longitude);
      }
    ).catch(
      (error) => {
        console.log("Erro ao capturar a localização", error);
      }
    );
  }
}
