import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonBadge
} from '@ionic/angular';

import {
  heart,
  heartOutline,
  locationOutline,
  star,
  shareOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import { Lugar } from '../../models/lugar.model';
import { LugaresService } from '../../services/lugares.service';
import { FavoritosService } from '../../services/favoritos.service';


@Component({
  selector: 'app-detalle-lugar',

  templateUrl: './detalle-lugar.page.html',

  styleUrls: ['./detalle-lugar.page.scss'],

  standalone: true,

  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonBadge
  ]
})


export class DetalleLugarPage implements OnInit {

// LUGAR //

  lugar: Lugar | undefined;
  
  // FAVORITO //

  esFavorito = false;

  procesandoFavorito = false;


// CONSTRUCTO //

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lugaresService: LugaresService,
    private favoritosService: FavoritosService,
    private changeDetector: ChangeDetectorRef
  ) {

    addIcons({
      heart,
      heartOutline,
      locationOutline,
      star,
      shareOutline
    });

  }

// INICIALIZAR //

  async ngOnInit(): Promise<void> {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );


    this.lugar =
      this.lugaresService.obtenerLugarPorId(id);


    if (this.lugar) {

      await this.actualizarEstadoFavorito();

    }

  }

  // COMPROBAR ESTADO DEL FAVORITO //

  private async actualizarEstadoFavorito(): Promise<void> {

    if (!this.lugar) {
      return;
    }

    try {

      this.esFavorito =
        await this.favoritosService.esFavorito(
          this.lugar.id
        );


      console.log(
        'Estado actual del favorito:',
        this.esFavorito
      );


      this.changeDetector.detectChanges();

    } catch (error) {

      console.error(
        'Error comprobando favorito:',
        error
      );

      this.esFavorito = false;

    }

  }

// AL VOLVER A LA PAGINA //

  async ionViewWillEnter(): Promise<void> {

    if (!this.lugar) {
      return;
    }


    await this.actualizarEstadoFavorito();

  }

// AGREGAR / QUITAR FAVORITO //

  async agregarFavorito(): Promise<void> {

    if (
      !this.lugar ||
      this.procesandoFavorito
    ) {

      return;

    }


    this.procesandoFavorito = true;

    this.changeDetector.detectChanges();


    try {

      const nuevoEstado =
        await this.favoritosService.alternarFavorito(
          this.lugar
        );
        
      // ACTUALIZAR ESTADO VISUAL //
      this.esFavorito =
        nuevoEstado;

      console.log(
        this.esFavorito
          ? 'Lugar agregado a favoritos:'
          : 'Lugar eliminado de favoritos:',
        this.lugar.nombre
      );


    // ACTUALIZAR INTERFAZ //

      this.changeDetector.detectChanges();

    } catch (error) {

      console.error(
        'Error actualizando favorito:',
        error
      );

    } finally {

      this.procesandoFavorito = false;

      this.changeDetector.detectChanges();

    }

  }

  // VER EN MAPA //

  async verEnMapa(): Promise<void> {

    if (!this.lugar) {
      return;
    }


    await this.router.navigate(
      ['/tabs/mapa'],
      {
        queryParams: {
          lugarId: this.lugar.id
        }
      }
    );

  }

  // COMPARTIR //

  compartir(): void {

    console.log(
      'Compartir:',
      this.lugar?.nombre
    );

  }

}