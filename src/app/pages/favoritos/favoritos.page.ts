import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonSpinner
} from '@ionic/angular';

import {
  heart,
  heartOutline,
  trashOutline,
  locationOutline,
  star
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import { Lugar } from '../../models/lugar.model';
import { FavoritosService } from '../../services/favoritos.service';


@Component({
  selector: 'app-favoritos',

  templateUrl: './favoritos.page.html',

  styleUrls: ['./favoritos.page.scss'],

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,

    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,

    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,

    IonRefresher,
    IonRefresherContent,
    IonSpinner
  ]
})


export class FavoritosPage
  implements OnInit, OnDestroy {


  // FAVORITOS // 

  favoritos: Lugar[] = [];

  // ESTADO // 

  cargando = true;

  eliminandoId: number | null = null;

  // SUSCRIPCION // 

  private favoritosSubscription?: Subscription;


  // CONSTRUCTOR // 

  constructor(
    private favoritosService: FavoritosService,
    private changeDetector: ChangeDetectorRef
  ) {

    addIcons({

      heart,
      heartOutline,
      trashOutline,
      locationOutline,
      star

    });

  }

  // INICIO // 

  ngOnInit(): void {

    console.log(
      ' FavoritosPage iniciada'
    );


    // Cargar favoritos inicialmente

    this.cargarFavoritos();

    // ESCUCHAR CAMBIOS AUTOMATICAMENTE // 

    this.favoritosSubscription =
      this.favoritosService.favoritos$
        .subscribe(
          (favoritos) => {

            console.log(
              'Favoritos actualizados:',
              favoritos
            );


            this.favoritos = [
              ...favoritos
            ];


            this.cargando = false;


            // Forzar actualizacion visual

            this.changeDetector.detectChanges();

          }
        );

  }

  // DESTRUIR SUSCRIPCION // 

  ngOnDestroy(): void {

    this.favoritosSubscription
      ?.unsubscribe();

  }

  // CARGAR FAVORITOS // 

  async cargarFavoritos(): Promise<void> {

    console.log(
      'Cargando favoritos...'
    );


    this.cargando = true;

    this.changeDetector.detectChanges();


    try {

      const favoritos =
        await this.favoritosService
          .obtenerFavoritos();


      this.favoritos = [
        ...favoritos
      ];


      console.log(
        'Favoritos encontrados:',
        this.favoritos
      );

    } catch (error) {

      console.error(
        'Error cargando favoritos:',
        error
      );


      this.favoritos = [];

    }


    this.cargando = false;


    this.changeDetector.detectChanges();


    console.log(
      'Carga de favoritos terminada.'
    );

  }

  // AL VOLVER A LA PESTAÑA // 

  ionViewWillEnter(): void {

    console.log(
      'Entrando a Favoritos'
    );


    this.cargarFavoritos();

  }

  // ELIMINAR FAVORITO // 

  async eliminarFavorito(
    lugar: Lugar
  ): Promise<void> {

    if (
      this.eliminandoId !== null
    ) {

      return;

    }


    this.eliminandoId =
      lugar.id;

    this.changeDetector.detectChanges();


    try {

      await this.favoritosService
        .eliminarFavorito(
          lugar.id
        );


      console.log(
        'Favorito eliminado:',
        lugar.nombre
      );

    } catch (error) {

      console.error(
        'Error eliminando favorito:',
        error
      );

    }


    this.eliminandoId = null;

    this.changeDetector.detectChanges();

  }

  // PULL TO REFRESH // 

  async refrescarFavoritos(
    event: any
  ): Promise<void> {

    console.log(
      'Actualizando favoritos...'
    );


    await this.cargarFavoritos();


    event.target.complete();

  }

}