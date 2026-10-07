import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonIcon,
  IonCard,
  IonCardContent,
  IonButton,
  IonNote
} from '@ionic/angular';

import {
  notificationsOutline,
  locationOutline,
  moonOutline,
  informationCircleOutline,
  refreshOutline,
  chevronBackOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonIcon,
    IonCard,
    IonCardContent,
    IonButton,
    IonNote
  ]
})
export class ConfiguracionPage implements OnInit {

  notificacionesActivas = true;
  modoOscuro = false;

  private storage!: Storage;
  private storageReady: Promise<Storage>;

  constructor(
    private storageService: Storage,
    private router: Router
  ) {

    addIcons({
      notificationsOutline,
      locationOutline,
      moonOutline,
      informationCircleOutline,
      refreshOutline,
      chevronBackOutline
    });

    this.storageReady = this.inicializarStorage();
  }

  async ngOnInit(): Promise<void> {
    await this.cargarPreferencias();
  }


// INICIALIZAR STORAGE //

  private async inicializarStorage(): Promise<Storage> {

    this.storage = await this.storageService.create();

    return this.storage;
  }

// CARGAR PREFERENCIAS //

  private async cargarPreferencias(): Promise<void> {

    const storage = await this.storageReady;

    const notificaciones =
      await storage.get('explorard_notificaciones');

    const tema =
      await storage.get('explorard_modo_oscuro');


    if (notificaciones !== null) {

      this.notificacionesActivas = notificaciones;

    }


    if (tema !== null) {

      this.modoOscuro = tema;

    }


    this.aplicarTema();
  }

// NOTIFICACIONES //

  async cambiarNotificaciones(): Promise<void> {

    const storage = await this.storageReady;

    await storage.set(
      'explorard_notificaciones',
      this.notificacionesActivas
    );

  }

// MODO OSCURO //

  async cambiarModoOscuro(): Promise<void> {

    const storage = await this.storageReady;

    await storage.set(
      'explorard_modo_oscuro',
      this.modoOscuro
    );

    this.aplicarTema();

  }

// APLICAR TEMA //

  private aplicarTema(): void {

    document.body.classList.toggle(
      'tema-oscuro',
      this.modoOscuro
    );

  }

// ABRIR MAPA //

  abrirMapa(): void {

    this.router.navigate([
      '/tabs/mapa'
    ]);

  }

// RESTABLECER PREFERENCIAS //

  async restablecerPreferencias(): Promise<void> {

    const storage = await this.storageReady;

    this.notificacionesActivas = true;

    this.modoOscuro = false;


    await storage.set(
      'explorard_notificaciones',
      true
    );


    await storage.set(
      'explorard_modo_oscuro',
      false
    );


    this.aplicarTema();

  }

  // VOLVER AL PERFIL //

  volver(): void {

    this.router.navigate([
      '/tabs/perfil'
    ]);

  }

}