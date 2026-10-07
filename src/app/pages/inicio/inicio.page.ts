import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonIcon
} from '@ionic/angular';

import {
  locationOutline,
  star,
  arrowForwardOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import { Lugar } from '../../models/lugar.model';
import { LugaresService } from '../../services/lugares.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonIcon
  ]
})
export class InicioPage {

  textoBusqueda = '';

  categorias = [
    'Playas',
    'Montañas',
    'Naturaleza',
    'Cultura',
    'Gastronomía'
  ];

  lugares: Lugar[] = [];

  lugaresFiltrados: Lugar[] = [];

  // SWIPE / CARRUSEL // 

  destinosDestacados: Lugar[] = [];

  destinoActual = 0;

  private posicionInicioX = 0;

  private posicionActualX = 0;

  private desplazando = false;


  constructor(
    private lugaresService: LugaresService
  ) {

    addIcons({
      locationOutline,
      star,
      arrowForwardOutline
    });


    this.lugares =
      this.lugaresService.obtenerLugares();

    this.lugaresFiltrados =
      [...this.lugares];

    
      // DESTINOS DESTACADOS// 
    this.destinosDestacados =
      this.lugares.slice(0, 4);

  }

  // BUSCAR LUGAR // 

  buscarLugar(): void {

    const texto =
      this.textoBusqueda
        .trim()
        .toLowerCase();


    if (!texto) {

      this.lugaresFiltrados =
        [...this.lugares];

      return;

    }


    this.lugaresFiltrados =
      this.lugares.filter(
        (lugar) => {

          return (
            lugar.nombre
              .toLowerCase()
              .includes(texto)

            ||

            lugar.ubicacion
              .toLowerCase()
              .includes(texto)

            ||

            lugar.provincia
              .toLowerCase()
              .includes(texto)

            ||

            lugar.categoria
              .toLowerCase()
              .includes(texto)
          );

        }
      );

  }

  // SELECCIONAR CATEGORIA // 

  seleccionarCategoria(
    categoria: string
  ): void {

    this.lugaresFiltrados =
      this.lugares.filter(
        (lugar) =>
          lugar.categoria === categoria
      );

  }

  // VER TODOS // 

  verTodos(): void {

    this.lugaresFiltrados =
      [...this.lugares];

    this.textoBusqueda = '';

  }

  // INICIO DEL SWIPE // 

  iniciarSwipe(
    event: TouchEvent
  ): void {

    if (
      event.touches.length !== 1
    ) {
      return;
    }


    this.posicionInicioX =
      event.touches[0].clientX;

    this.posicionActualX =
      this.posicionInicioX;

    this.desplazando = true;

  }

  // MOVIMIENTO DEL SWIPE // 

  moverSwipe(
    event: TouchEvent
  ): void {

    if (!this.desplazando) {
      return;
    }


    if (
      event.touches.length !== 1
    ) {
      return;
    }


    this.posicionActualX =
      event.touches[0].clientX;

  }


  // FINALIZAR SWIPE // 

  finalizarSwipe(
    event: TouchEvent
  ): void {

    if (!this.desplazando) {
      return;
    }


    this.desplazando = false;


    const distancia =
      this.posicionActualX -
      this.posicionInicioX;


    const distanciaMinima =
      60;


    // DESLIZAR HACIA LA IZQUIERDA // 

    if (
      distancia < -distanciaMinima
    ) {

      this.siguienteDestino();

      return;

    }


    // DESLIZAR HACIA LA DERECHA // 

    if (
      distancia > distanciaMinima
    ) {

      this.anteriorDestino();

    }

  }

  // SIGUIENTE DESTINO // 

  siguienteDestino(): void {

    if (
      this.destinosDestacados.length === 0
    ) {
      return;
    }


    if (
      this.destinoActual <
      this.destinosDestacados.length - 1
    ) {

      this.destinoActual++;

    } else {

      // Volver al primero
      this.destinoActual = 0;

    }

  }

  // DESTINO ANTERIOR // 

  anteriorDestino(): void {

    if (
      this.destinosDestacados.length === 0
    ) {
      return;
    }


    if (
      this.destinoActual > 0
    ) {

      this.destinoActual--;

    } else {

      // Ir al último
      this.destinoActual =
        this.destinosDestacados.length - 1;

    }

  }

  // SELECCIONAR DESTINO // 

  seleccionarDestino(
    indice: number
  ): void {

    if (
      indice < 0 ||
      indice >=
        this.destinosDestacados.length
    ) {
      return;
    }


    this.destinoActual = indice;

  }

  // REFRESCAR // 

  refrescar(event: any): void {

    setTimeout(() => {

      this.lugares =
        this.lugaresService.obtenerLugares();


      this.lugaresFiltrados =
        [...this.lugares];


      this.destinosDestacados =
        this.lugares.slice(0, 4);


      // Mantener índice válido
      if (
        this.destinoActual >=
        this.destinosDestacados.length
      ) {

        this.destinoActual = 0;

      }


      event.target.complete();

    }, 1000);

  }

}