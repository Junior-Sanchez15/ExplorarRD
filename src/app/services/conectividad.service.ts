import { Injectable, NgZone } from '@angular/core';

import {
  Network,
  ConnectionStatus
} from '@capacitor/network';

import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConectividadService {


  // ESTADO DE CONEXION //

  private estadoConexionSubject =
    new BehaviorSubject<boolean>(
      typeof navigator !== 'undefined'
        ? navigator.onLine
        : true
    );

  estadoConexion$ =
    this.estadoConexionSubject.asObservable();


  // TIPO DE CONEXION //

  private tipoConexionSubject =
    new BehaviorSubject<string>(
      'unknown'
    );

  tipoConexion$ =
    this.tipoConexionSubject.asObservable();


  // LISTENERS DEL NAVEGADOR //

  private listenerOnline =
    () => {

      console.log(
        'Navegador: ONLINE'
      );

      this.actualizarConexion(
        true
      );

    };


  private listenerOffline =
    () => {

      console.log(
        'Navegador: OFFLINE'
      );

      this.actualizarConexion(
        false
      );

    };


  // CONSTRUCTOR //

  constructor(
    private zone: NgZone
  ) {

    this.inicializar();

  }


  private async inicializar(): Promise<void> {

    try {

      // ESTADO INICIAL DEL NAVEGADOR //

      if (
        typeof navigator !== 'undefined'
      ) {

        this.actualizarConexion(
          navigator.onLine
        );

        window.addEventListener(
          'online',
          this.listenerOnline
        );

        window.addEventListener(
          'offline',
          this.listenerOffline
        );

      }

      // ESTADO INICIAL DE CAPACITOR //

      const estado =
        await Network.getStatus();

      this.actualizarEstado(
        estado
      );


      // ESCUCHAR CAMBIOS DE CAPACITOR //

      await Network.addListener(
        'networkStatusChange',
        (status) => {

          console.log(
            'Capacitor Network:',
            status
          );

          this.actualizarEstado(
            status
          );

        }
      );


    } catch (error) {

      console.error(
        'Error inicializando conectividad:',
        error
      );

    }

  }


  // ACTUALIZAR ESTADO DE CAPACITOR //

  private actualizarEstado(
    status: ConnectionStatus
  ): void {

    this.zone.run(() => {

      this.estadoConexionSubject.next(
        status.connected
      );

      this.tipoConexionSubject.next(
        status.connectionType
      );


      console.log(
        ' Conexión:',
        status.connected
          ? 'ONLINE'
          : 'OFFLINE'
      );


      console.log(
        ' Tipo:',
        status.connectionType
      );

    });

  }


  // ACTUALIZAR SOLO CONEXION //

  private actualizarConexion(
    conectado: boolean
  ): void {

    this.zone.run(() => {

      this.estadoConexionSubject.next(
        conectado
      );


      if (!conectado) {

        this.tipoConexionSubject.next(
          'none'
        );

      }


      console.log(
        'Estado de conexion:',
        conectado
          ? 'ONLINE'
          : 'OFFLINE'
      );

    });

  }


  // OBTENER ESTADO ACTUAL //

  async obtenerEstado(): Promise<ConnectionStatus> {

    return await Network.getStatus();

  }


  // VERIFICAR CONEXION //

  async estaConectado(): Promise<boolean> {

    const estado =
      await Network.getStatus();

    return estado.connected;

  }


  // OBTENER TIPO DE CONEXION // 

  async obtenerTipoConexion(): Promise<string> {

    const estado =
      await Network.getStatus();

    return estado.connectionType;

  }

}