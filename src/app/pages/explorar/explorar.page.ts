import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonChip,
  IonLabel,
  IonIcon
} from '@ionic/angular';

import {
  locationOutline,
  star,
  closeCircleOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import { Lugar } from '../../models/lugar.model';
import { LugaresService } from '../../services/lugares.service';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonChip,
    IonLabel,
    IonIcon
  ]
})
export class ExplorarPage implements OnInit {

  // BUSQUEDA Y CATEGORIAS //

  textoBusqueda = '';

  categorias = [
    'Todos',
    'Playas',
    'Montañas',
    'Naturaleza',
    'Cultura',
    'Gastronomia'
  ];

  categoriaSeleccionada = 'Todos';

  lugares: Lugar[] = [];

  lugaresFiltrados: Lugar[] = [];

 // SWIPE //

  destinoSwipe: Lugar | null = null;

  indiceSwipe = 0;

  private posicionInicioX = 0;

  private posicionActualX = 0;

  private desplazando = false;


  constructor(
    private lugaresService: LugaresService
  ) {

    addIcons({
      locationOutline,
      star,
      closeCircleOutline
    });

  }

// INICIO //

  ngOnInit(): void {

    this.lugares =
      this.lugaresService.obtenerLugares();

    this.lugaresFiltrados =
      [...this.lugares];

    this.actualizarDestinoSwipe();

  }

// BUSCAR //

  buscarLugar(): void {

    this.aplicarFiltros();

  }

  // SELECCIONAR CATEGORIA //

  seleccionarCategoria(
    categoria: string
  ): void {

    this.categoriaSeleccionada =
      categoria;

    this.aplicarFiltros();

  }

// LIMPIAR BUSQUEDA //

  limpiarBusqueda(): void {

    this.textoBusqueda = '';

    this.categoriaSeleccionada =
      'Todos';

    this.aplicarFiltros();

  }

  // APLICAR FILTROS //

  private aplicarFiltros(): void {

    const texto =
      this.textoBusqueda
        .trim()
        .toLowerCase();


    this.lugaresFiltrados =
      this.lugares.filter(
        (lugar) => {

          const coincideCategoria =
            this.categoriaSeleccionada === 'Todos' ||
            lugar.categoria ===
              this.categoriaSeleccionada;


          const coincideBusqueda =
            !texto ||
            lugar.nombre
              .toLowerCase()
              .includes(texto) ||

            lugar.ubicacion
              .toLowerCase()
              .includes(texto) ||

            lugar.provincia
              .toLowerCase()
              .includes(texto) ||

            lugar.categoria
              .toLowerCase()
              .includes(texto);


          return (
            coincideCategoria &&
            coincideBusqueda
          );

        }
      );

    this.indiceSwipe = 0;

    this.actualizarDestinoSwipe();

  }


  // ACTUALIZAR DESTINO DEL SWIPE //

  private actualizarDestinoSwipe(): void {

    if (
      this.lugaresFiltrados.length === 0
    ) {

      this.destinoSwipe = null;

      this.indiceSwipe = 0;

      return;

    }


    if (
      this.indiceSwipe >=
      this.lugaresFiltrados.length
    ) {

      this.indiceSwipe = 0;

    }


    this.destinoSwipe =
      this.lugaresFiltrados[
        this.indiceSwipe
      ];

  }

  // INICIAR SWIPE //

  iniciarSwipe(
    event: TouchEvent
  ): void {

    if (
      event.touches.length !== 1 ||
      this.lugaresFiltrados.length === 0
    ) {
      return;
    }


    this.posicionInicioX =
      event.touches[0].clientX;

    this.posicionActualX =
      this.posicionInicioX;

    this.desplazando = true;

  }

  // MOVER SWIPE // 

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


    const distanciaMinima = 60;

    // IZQUIERDA - SIGUIENTE // 

    if (
      distancia < -distanciaMinima
    ) {

      this.siguienteDestino();

      return;

    }

    // DERECHA - ANTERIOR // 

    if (
      distancia > distanciaMinima
    ) {

      this.anteriorDestino();

    }

  }

  // SIGUIENTE DESTINO // 

  siguienteDestino(): void {

    if (
      this.lugaresFiltrados.length === 0
    ) {
      return;
    }


    if (
      this.indiceSwipe <
      this.lugaresFiltrados.length - 1
    ) {

      this.indiceSwipe++;

    } else {

      this.indiceSwipe = 0;

    }


    this.actualizarDestinoSwipe();

  }


  // DESTINO ANTERIOR // 

  anteriorDestino(): void {

    if (
      this.lugaresFiltrados.length === 0
    ) {
      return;
    }


    if (
      this.indiceSwipe > 0
    ) {

      this.indiceSwipe--;

    } else {

      this.indiceSwipe =
        this.lugaresFiltrados.length - 1;

    }


    this.actualizarDestinoSwipe();

  }

  // SELECCIONAR DESTINO // 

  seleccionarDestino(
    indice: number
  ): void {

    if (
      indice < 0 ||
      indice >= this.lugaresFiltrados.length
    ) {
      return;
    }


    this.indiceSwipe = indice;

    this.actualizarDestinoSwipe();

  }

}