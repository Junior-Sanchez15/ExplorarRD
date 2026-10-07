import { Injectable } from '@angular/core';

import {
  BleClient,
  ScanResult,
  ScanMode,
  BleDevice
} from '@capacitor-community/bluetooth-le';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  // ESTADO DE BLUETOOTH // 

  private bluetoothActivoSubject =
    new BehaviorSubject<boolean>(false);

  bluetoothActivo$ =
    this.bluetoothActivoSubject.asObservable();


  // DISPOSITIVOS ENCONTRADOS // 

  private dispositivosSubject =
    new BehaviorSubject<ScanResult[]>([]);

  dispositivos$ =
    this.dispositivosSubject.asObservable();


  // ESTADO DE ESCANEO // 

  private escaneandoSubject =
    new BehaviorSubject<boolean>(false);

  escaneando$ =
    this.escaneandoSubject.asObservable();

  // INICIALIZAR BLUETOOTH // 

  async inicializar(): Promise<void> {

    try {

      await BleClient.initialize();

      console.log(
        'Bluetooth inicializado correctamente'
      );

      const habilitado =
        await BleClient.isEnabled();

      this.bluetoothActivoSubject.next(
        habilitado
      );

      console.log(
        'Bluetooth:',
        habilitado
          ? 'ACTIVADO'
          : 'DESACTIVADO'
      );

    } catch (error) {

      console.error(
        ' Error inicializando Bluetooth:',
        error
      );

      this.bluetoothActivoSubject.next(
        false
      );

    }

  }


  // COMPROBAR BLUETOOTH // 

  async comprobarBluetooth(): Promise<boolean> {

    try {

      const habilitado =
        await BleClient.isEnabled();

      this.bluetoothActivoSubject.next(
        habilitado
      );

      return habilitado;

    } catch (error) {

      console.error(
        'Error comprobando Bluetooth:',
        error
      );

      return false;

    }

  }


  // ACTIVAR BLUETOOTH //

  async activarBluetooth(): Promise<boolean> {

    try {

      await BleClient.enable();

      this.bluetoothActivoSubject.next(
        true
      );

      console.log(
        'Bluetooth activado'
      );

      return true;

    } catch (error) {

      console.error(
        'No se pudo activar Bluetooth:',
        error
      );

      return false;

    }

  }

  // OBTENER DISPOSITIVOS VINCULADOS // 

  async obtenerDispositivosVinculados(): Promise<BleDevice[]> {

    try {

      const dispositivos =
        await BleClient.getBondedDevices();

      console.log(
        ' Dispositivos vinculados:',
        dispositivos
      );

      return dispositivos;

    } catch (error) {

      console.error(
        'Error obteniendo dispositivos vinculados:',
        error
      );

      return [];

    }

  }


  // ESCANEAR DISPOSITIVOS BLE // 

  async escanear(): Promise<void> {

    if (
      this.escaneandoSubject.value
    ) {

      return;

    }


    try {

      // Limpiar resultados anteriores

      this.dispositivosSubject.next([]);


      // Activar estado de escaneo

      this.escaneandoSubject.next(
        true
      );


      console.log(
        'Buscando dispositivos Bluetooth BLE...'
      );


      // Obtener dispositivos vinculados

      const dispositivosVinculados =
        await this.obtenerDispositivosVinculados();


      // INICIAR ESCANEO //
      await BleClient.requestLEScan(
        {

          scanMode:
            ScanMode.SCAN_MODE_LOW_LATENCY,

          allowDuplicates:
            false,

          allowExtendedAdvertising:
            true

        },

        (resultado) => {

          console.log(
            ' Dispositivo encontrado:',
            resultado
          );


          const dispositivos =
            this.dispositivosSubject.value;


          // EVITAR DUPLICADOS //
          const existe =
            dispositivos.some(
              dispositivo =>
                dispositivo.device.deviceId ===
                resultado.device.deviceId
            );


          if (existe) {

            return;

          }

          // OBTENER NOMBRE //

          let nombre =
            resultado.device.name ||
            resultado.localName ||
            '';


          // BUSCAR EN DISPOSITIVOS VINCULADOS //

          if (!nombre) {

            const dispositivoVinculado =
              dispositivosVinculados.find(
                dispositivo =>
                  dispositivo.deviceId ===
                  resultado.device.deviceId
              );

            if (
              dispositivoVinculado &&
              dispositivoVinculado.name
            ) {

              nombre =
                dispositivoVinculado.name;

            }

          }


          // NOMBRE POR DEFECTO//
          if (!nombre) {

            nombre =
              'Nombre no disponible';

          }


          // PREPARAR RESULTADO//

          const resultadoPreparado: ScanResult = {

            ...resultado,

            device: {

              ...resultado.device,

              name: nombre

            }

          };


          console.log(
            'Dispositivo preparado:',
            resultadoPreparado.device.name,
            resultadoPreparado.device.deviceId
          );


          // GUARDAR DISPOSITIVO //

          this.dispositivosSubject.next(
            [
              ...dispositivos,
              resultadoPreparado
            ]
          );

        }
      );

      // Escanear durante 8 segundos //

      await new Promise(
        resolve =>
          setTimeout(
            resolve,
            8000
          )
      );


      // DETENER ESCANEO //

      await this.detenerEscaneo();


    } catch (error) {

      console.error(
        'Error durante el escaneo:',
        error
      );


      this.escaneandoSubject.next(
        false
      );

    }

  }


  // DETENER ESCANEO //

  async detenerEscaneo(): Promise<void> {

    try {

      await BleClient.stopLEScan();

      this.escaneandoSubject.next(
        false
      );


      console.log(
        'Escaneo Bluetooth terminado'
      );

    } catch (error) {

      console.error(
        'Error deteniendo escaneo:',
        error
      );

      this.escaneandoSubject.next(
        false
      );

    }

  }


  // LIMPIAR DISPOSITIVOS //
  
  limpiarDispositivos(): void {

    this.dispositivosSubject.next(
      []
    );

  }

}