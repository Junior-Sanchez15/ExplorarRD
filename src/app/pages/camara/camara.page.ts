import {
  Component,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent
} from '@ionic/angular';

import {
  camera,
  cameraOutline,
  imageOutline,
  refreshOutline,
  closeOutline,
  trashOutline,
  scanOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import {
  Camera,
  CameraResultType,
  CameraSource
} from '@capacitor/camera';

import { Capacitor } from '@capacitor/core';

import {
  BarcodeScanner,
  BarcodeFormat
} from '@capacitor-mlkit/barcode-scanning';


@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent
  ]
})
export class CamaraPage implements OnDestroy {


  
  /* FOTOGRAFIAS */
  fotosCapturadas: string[] = [];

  /* Fotografia que se esta mostrando actualmente */
  imagenCapturada: string | null = null;


  /* ESTADO DE LA CAMARA */

  procesando = false;

  camaraActiva = false;

  stream: MediaStream | null = null;

  mensajeError = '';


  /* ESTADO DEL CODIGO QR */

  resultadoQR = '';

  escaneandoQR = false;


  /* CONSTRUCTOR */

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {

    addIcons({
      camera,
      cameraOutline,
      imageOutline,
      refreshOutline,
      closeOutline,
      trashOutline,
      scanOutline
    });

  }


  /* ABRIR CAMARA */

  async tomarFoto(): Promise<void> {

    if (this.procesando) {

      return;

    }

    this.mensajeError = '';


    /* Android / iOS */

    if (Capacitor.isNativePlatform()) {

      await this.tomarFotoNativa();

      return;

    }

    await this.abrirCamaraWeb();

  }


  /* CAMARA NATIVA */

  private async tomarFotoNativa(): Promise<void> {

    this.procesando = true;

    try {

      const foto = await Camera.getPhoto({

        quality: 90,

        allowEditing: false,

        resultType: CameraResultType.DataUrl,

        source: CameraSource.Camera

      });


      if (foto.dataUrl) {

        this.agregarFotografia(
          foto.dataUrl
        );

      }


    } catch (error) {

      console.error(
        'Error al abrir la cámara:',
        error
      );

      this.mensajeError =
        'No fue posible abrir la cámara. Verifica los permisos del dispositivo.';


    } finally {

      this.procesando = false;

      this.changeDetector.detectChanges();

    }

  }

  /* CAMARA WEB */

  async abrirCamaraWeb(): Promise<void> {

    this.mensajeError = '';

    try {

      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {

        this.mensajeError =
          'Tu navegador no permite utilizar la cámara.';

        return;

      }

      this.cerrarCamara();


      this.stream =
        await navigator.mediaDevices.getUserMedia({

          video: {

            facingMode: {

              ideal: 'environment'

            }

          },

          audio: false

        });


      this.camaraActiva = true;


      setTimeout(() => {

        const video =
          document.getElementById(
            'vistaCamara'
          ) as HTMLVideoElement | null;


        if (video && this.stream) {

          video.srcObject =
            this.stream;


          video.play().catch(error => {

            console.error(
              'Error reproduciendo cámara:',
              error
            );

          });

        }

      }, 100);


      this.changeDetector.detectChanges();


    } catch (error) {

      console.error(
        'Error accediendo a la cámara:',
        error
      );

      this.camaraActiva = false;

      this.mensajeError =
        'No se pudo acceder a la cámara. Revisa los permisos del navegador.';

      this.changeDetector.detectChanges();

    }

  }


  /* CAPTURAR FOTO DESDE CAMARA WEB */

  capturarFotoWeb(): void {

    const video =
      document.getElementById(
        'vistaCamara'
      ) as HTMLVideoElement | null;


    if (!video) {

      return;

    }


    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {

      this.mensajeError =
        'La cámara todavía no está lista.';

      return;

    }


    const canvas =
      document.createElement(
        'canvas'
      );


    canvas.width =
      video.videoWidth;


    canvas.height =
      video.videoHeight;


    const contexto =
      canvas.getContext('2d');


    if (!contexto) {

      return;

    }


    contexto.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );


    const imagen =
      canvas.toDataURL(
        'image/jpeg',
        0.9
      );


    this.agregarFotografia(imagen);

    this.cerrarCamara();

    this.changeDetector.detectChanges();

  }


  /* AGREGAR FOTOGRAFIA */

  private agregarFotografia(
    imagen: string
  ): void {

    this.fotosCapturadas.push(imagen);

    this.imagenCapturada =
      imagen;

  }


  /* GALERIA */

  async seleccionarImagen(): Promise<void> {

    if (this.procesando) {

      return;

    }

    this.mensajeError = '';

    if (!Capacitor.isNativePlatform()) {

      const input =
        document.getElementById(
          'inputGaleria'
        ) as HTMLInputElement | null;


      if (input) {

        input.value = '';

        input.click();

      }

      return;

    }

    this.procesando = true;

    try {

      const foto = await Camera.getPhoto({

        quality: 90,

        allowEditing: false,

        resultType: CameraResultType.DataUrl,

        source: CameraSource.Photos

      });


      if (foto.dataUrl) {

        this.agregarFotografia(
          foto.dataUrl
        );

      }


    } catch (error) {

      console.error(
        'Error seleccionando imagen:',
        error
      );

      this.mensajeError =
        'No se pudo cargar la fotografía seleccionada.';


    } finally {

      this.procesando = false;

      this.changeDetector.detectChanges();

    }

  }

  cargarImagenDesdeArchivo(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    const archivo =
      input.files?.[0];


    if (!archivo) {

      return;

    }

    if (!archivo.type.startsWith('image/')) {

      this.mensajeError =
        'El archivo seleccionado no es una imagen.';

      input.value = '';

      return;

    }


    const lector =
      new FileReader();


    lector.onload = () => {

      const resultado =
        lector.result;


      if (typeof resultado === 'string') {

        this.agregarFotografia(
          resultado
        );

      }


      input.value = '';

      this.changeDetector.detectChanges();

    };


    lector.onerror = () => {

      this.mensajeError =
        'No se pudo leer la fotografía seleccionada.';

      input.value = '';

      this.changeDetector.detectChanges();

    };


    lector.readAsDataURL(archivo);

  }


  /* ESCANEAR CODIGO QR */

  async escanearQR(): Promise<void> {

    if (this.escaneandoQR) return;

    this.mensajeError = '';
    this.resultadoQR = '';
    this.escaneandoQR = true;

    this.changeDetector.detectChanges();

    try {

      const { available } =
        await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();


      if (!available) {

        await BarcodeScanner.installGoogleBarcodeScannerModule();

        this.mensajeError =
          'El lector QR se está instalando. Intenta escanear nuevamente en unos segundos.';

        return;

      }


      const resultado =
        await BarcodeScanner.scan({

          formats: [
            BarcodeFormat.QrCode
          ],

          autoZoom: true

        });


      if (resultado.barcodes.length > 0) {

        const codigo =
          resultado.barcodes[0];


        this.resultadoQR =
          codigo.rawValue ?? '';


        if (!this.resultadoQR) {

          this.mensajeError =
            'El codigo QR fue detectado, pero no contiene texto legible.';

        }

      } else {

        this.mensajeError =
          'No se detecto ningun codigo QR.';

      }


    } catch (error) {

      console.error(
        'Error escaneando QR:',
        error
      );

      this.mensajeError =
        'No fue posible escanear el codigo QR. Verifica que la camara tenga permiso.';

    } finally {

      this.escaneandoQR = false;

      this.changeDetector.detectChanges();

    }

  }

  /* CERRAR CAMARA */

  cerrarCamara(): void {

    if (this.stream) {

      this.stream
        .getTracks()
        .forEach(track => {

          track.stop();

        });

    }

    this.stream = null;

    this.camaraActiva = false;

  }


  /* ELIMINAR FOTO ACTUAL */

  eliminarFoto(): void {

    if (!this.imagenCapturada) {

      return;

    }

    const indice =
      this.fotosCapturadas.indexOf(
        this.imagenCapturada
      );


    if (indice !== -1) {

      this.fotosCapturadas.splice(
        indice,
        1
      );

    }

    if (this.fotosCapturadas.length > 0) {

      this.imagenCapturada =
        this.fotosCapturadas[
          this.fotosCapturadas.length - 1
        ];

    } else {

      this.imagenCapturada = null;

    }


    this.changeDetector.detectChanges();

  }

  /* LIMPIAR TODAS LAS FOTOS */

  eliminarTodasLasFotos(): void {

    this.fotosCapturadas = [];

    this.imagenCapturada = null;

    this.changeDetector.detectChanges();

  }


  /* DESTRUIR COMPONENTE */

  ngOnDestroy(): void {

    this.cerrarCamara();

  }

}