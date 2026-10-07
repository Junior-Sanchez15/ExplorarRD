import { Geolocation } from '@capacitor/geolocation';

import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonCard,
  IonCardContent,
  IonBadge
} from '@ionic/angular';

import {
  personOutline,
  heartOutline,
  locationOutline,
  settingsOutline,
  informationCircleOutline,
  wifiOutline,
  bluetoothOutline,
  chevronForwardOutline,
  logOutOutline,
  musicalNotes,
  cameraOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import { Subscription } from 'rxjs';

import {
  ConectividadService
} from '../../services/conectividad.service';

import {
  BluetoothService
} from '../../services/bluetooth.service';

import {
  ScanResult
} from '@capacitor-community/bluetooth-le';


@Component({
  selector: 'app-perfil',

  templateUrl: './perfil.page.html',

  styleUrls: ['./perfil.page.scss'],

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,

    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonCard,
    IonCardContent,
    IonBadge
  ]
})
export class PerfilPage
  implements OnInit, OnDestroy {

  // INFORMACION DEL USUARIO // 

  nombreUsuario = 'Explorador';

  correoUsuario =
    'usuario@explorard.com';


  // INFORMACION DE LA APLICACION // 

  versionApp = '1.0.0';


  // UBICACION // 

  ubicacionActiva = false;


  // CONECTIVIDAD // 

  conexionActiva = false;

  tipoConexion = 'unknown';


  // BLUETOOTH // 

  bluetoothActivo = false;

  escaneandoBluetooth = false;

  dispositivosBluetooth: ScanResult[] = [];


  // SUSCRIPCIONES //

  private conexionSubscription?:
    Subscription;

  private tipoConexionSubscription?:
    Subscription;

  private bluetoothSubscription?:
    Subscription;

  private escaneoSubscription?:
    Subscription;

  private estadoEscaneoSubscription?:
    Subscription;


  // CONSTRUCTOR //

  constructor(
    private conectividadService:
      ConectividadService,

    private bluetoothService:
      BluetoothService,

    private changeDetector:
      ChangeDetectorRef
  ) {

    addIcons({

      personOutline,

      heartOutline,

      locationOutline,

      settingsOutline,

      informationCircleOutline,

      wifiOutline,

      bluetoothOutline,

      chevronForwardOutline,

      logOutOutline,

      musicalNotes,

      cameraOutline

    });

  }


  // INICIO // 

  ngOnInit(): void {

    console.log(
      '👤 Perfil iniciado'
    );

    // ESCUCHAR ESTADO ONLINE / OFFLINE // 

    this.conexionSubscription =
      this.conectividadService
        .estadoConexion$
        .subscribe(
          (conectado) => {

            console.log(
              'Perfil recibio estado:',
              conectado
                ? 'ONLINE'
                : 'OFFLINE'
            );


            this.conexionActiva =
              conectado;


            this.changeDetector.detectChanges();

          }
        );

    // ESCUCHAR TIPO DE CONEXION // 

    this.tipoConexionSubscription =
      this.conectividadService
        .tipoConexion$
        .subscribe(
          (tipo) => {

            console.log(
              ' Perfil recibió tipo:',
              tipo
            );


            this.tipoConexion =
              tipo;


            this.changeDetector.detectChanges();

          }
        );

    // ESCUCHAR ESTADO BLUETOOTH // 

    this.bluetoothSubscription =
      this.bluetoothService
        .bluetoothActivo$
        .subscribe(
          (activo) => {

            console.log(
              ' Bluetooth:',
              activo
                ? 'ACTIVADO'
                : 'DESACTIVADO'
            );


            this.bluetoothActivo =
              activo;


            this.changeDetector.detectChanges();

          }
        );


    // ESCUCHAR DISPOSITIVOS ENCONTRADOS // 

    this.escaneoSubscription =
      this.bluetoothService
        .dispositivos$
        .subscribe(
          (dispositivos) => {

            console.log(
              ' Dispositivos encontrados:',
              dispositivos
            );


            this.dispositivosBluetooth =
              [...dispositivos];


            this.changeDetector.detectChanges();

          }
        );


    // ESCUCHAR ESTADO DEL ESCANEO // 

    this.estadoEscaneoSubscription =
      this.bluetoothService
        .escaneando$
        .subscribe(
          (escaneando) => {

            console.log(
              ' Estado del escaneo:',
              escaneando
                ? 'ACTIVO'
                : 'DETENIDO'
            );


            this.escaneandoBluetooth =
              escaneando;


            this.changeDetector.detectChanges();

          }
        );

  }


  // AL ENTRAR NUEVAMENTE A PERFIL //
  ionViewWillEnter(): void {

    console.log(
      'Entrando nuevamente a Perfil'
    );

    this.actualizarEstadoUbicacion();

  }


  // ACTUALIZAR ESTADO DE UBICACION //

  async actualizarEstadoUbicacion(): Promise<void> {

    try {

      const permisos =
        await Geolocation.checkPermissions();


      this.ubicacionActiva =
        permisos.location === 'granted';


      console.log(
        ' Estado de ubicacion:',
        this.ubicacionActiva
          ? 'ACTIVA'
          : 'INACTIVA'
      );


      this.changeDetector.detectChanges();

    } catch (error) {

      console.error(
        'Error comprobando ubicación:',
        error
      );


      this.ubicacionActiva =
        false;


      this.changeDetector.detectChanges();

    }

  }

  // BLUETOOTH //

  async activarBluetooth(): Promise<void> {

    console.log(
      ' Iniciando Bluetooth...'
    );


    try {

      // INICIALIZAR BLUETOOTH //

      await this.bluetoothService
        .inicializar();


      // COMPROBAR ESTADO //

      const activo =
        await this.bluetoothService
          .comprobarBluetooth();

      // ACTIVAR SI ESTA APAGADO //

      if (!activo) {

        console.log(
          'Bluetooth esta desactivado'
        );


        const activado =
          await this.bluetoothService
            .activarBluetooth();


        if (!activado) {

          console.log(
            'No se pudo activar Bluetooth'
          );

          return;

        }

      }

      // INICIAR ESCANEO //

      console.log(
        'Iniciando busqueda de dispositivos...'
      );


      await this.bluetoothService
        .escanear();


    } catch (error) {

      console.error(
        'Error con Bluetooth:',
        error
      );

    }


    this.changeDetector.detectChanges();

  }

  // INFORMACION //

  mostrarInformacion(): void {

    console.log(
      'ℹ️ ExploraRD version:',
      this.versionApp
    );

  }


  // CERRAR SESION //

  cerrarSesion(): void {

    console.log(
      ' Sesion cerrada'
    );

  }


  // DESTRUIR //
  
  ngOnDestroy(): void {

    this.conexionSubscription
      ?.unsubscribe();


    this.tipoConexionSubscription
      ?.unsubscribe();


    this.bluetoothSubscription
      ?.unsubscribe();


    this.escaneoSubscription
      ?.unsubscribe();


    this.estadoEscaneoSubscription
      ?.unsubscribe();

  }

}