import {
  Component,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonRange
} from '@ionic/angular';

import {
  play,
  pause,
  stop,
  volumeHigh,
  musicalNotes
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.page.html',
  styleUrls: ['./multimedia.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonRange
  ]
})
export class MultimediaPage implements OnDestroy {

  audio: HTMLAudioElement;

  reproduciendo = false;

  volumen = 70;

  progreso = 0;

  tiempoActual = '0:00';

  duracion = '0:00';

  private actualizacion?: ReturnType<typeof setInterval>;


  constructor(
    private changeDetector: ChangeDetectorRef
  ) {

    addIcons({
      play,
      pause,
      stop,
      volumeHigh,
      musicalNotes
    });


    // CREAR AUDIO // 

    this.audio = new Audio(
      'assets/audio/atlas-dominican-republic.mp3'
    );

    this.audio.preload = 'metadata';

    this.audio.volume =
      this.volumen / 100;


    // DURACION // 

    this.audio.addEventListener(
      'loadedmetadata',
      () => {

        if (
          Number.isFinite(this.audio.duration)
        ) {

          this.duracion =
            this.formatearTiempo(
              this.audio.duration
            );

          this.changeDetector.detectChanges();

        }

      }
    );


    // CUANDO REALMENTE COMIENZA A REPRODUCIR // 

    this.audio.addEventListener(
      'play',
      () => {

        this.reproduciendo = true;

        this.iniciarActualizacion();

        this.changeDetector.detectChanges();

      }
    );


    // CUANDO REALMENTE SE PAUSA // 

    this.audio.addEventListener(
      'pause',
      () => {

        /*
         * Si terminó la canción no ponemos
         * simplemente "pausado".
         */
        if (
          this.audio.currentTime <
          this.audio.duration
        ) {

          this.reproduciendo = false;

        }

        this.detenerActualizacion();

        this.changeDetector.detectChanges();

      }
    );


    // CUANDO TERMINA // 

    this.audio.addEventListener(
      'ended',
      () => {

        this.detenerActualizacion();

        this.reproduciendo = false;

        this.progreso = 100;

        this.tiempoActual =
          this.duracion;


        this.actualizarBarraVisual(
          100
        );


        this.changeDetector.detectChanges();

      }
    );

  }


  // ACTUALIZACION DEL REPRODUCTOR //

  private iniciarActualizacion(): void {

    this.detenerActualizacion();


    this.actualizacion =
      setInterval(() => {

        if (
          this.audio.duration &&
          !this.audio.paused
        ) {

          const porcentaje =
            (
              this.audio.currentTime /
              this.audio.duration
            ) * 100;


          const tiempo =
            this.formatearTiempo(
              this.audio.currentTime
            );


          // Actualizar variables Angular

          this.progreso =
            porcentaje;

          this.tiempoActual =
            tiempo;


          // Actualizar directamente la barra

          this.actualizarBarraVisual(
            porcentaje
          );


          // FORZAR ACTUALIZACIÓN DE LA INTERFAZ

          this.changeDetector.detectChanges();

        }

      }, 250);

  }


  // DETENER ACTUALIZACION //

  private detenerActualizacion(): void {

    if (this.actualizacion) {

      clearInterval(
        this.actualizacion
      );

      this.actualizacion =
        undefined;

    }

  }

  // PLAY / PAUSE // 

  reproducirPausar(): void {

    if (!this.audio.paused) {

      this.audio.pause();

      return;

    }


    this.audio
      .play()
      .catch(error => {

        console.error(
          'Error reproduciendo el audio:',
          error
        );

      });

  }

  // DETENER // 

  detener(): void {

    this.audio.pause();

    this.audio.currentTime = 0;

    this.reproduciendo = false;

    this.progreso = 0;

    this.tiempoActual =
      '0:00';


    this.actualizarBarraVisual(
      0
    );


    this.changeDetector.detectChanges();

  }

  // CAMBIAR POSICION // 

  cambiarProgreso(
    event: Event
  ): void {

    if (!this.audio.duration) {

      return;

    }


    const barra =
      event.target as HTMLInputElement;


    const nuevoProgreso =
      Number(barra.value);


    this.audio.currentTime =
      (
        nuevoProgreso / 100
      ) * this.audio.duration;


    this.progreso =
      nuevoProgreso;


    this.tiempoActual =
      this.formatearTiempo(
        this.audio.currentTime
      );


    this.actualizarBarraVisual(
      nuevoProgreso
    );


    this.changeDetector.detectChanges();

  }


  // VOLUMEN // 

  cambiarVolumen(
    event: any
  ): void {

    const nuevoVolumen =
      Number(
        event.detail.value
      );


    this.volumen =
      nuevoVolumen;


    this.audio.volume =
      nuevoVolumen / 100;


    this.changeDetector.detectChanges();

  }


  // ACTUALIZAR BARRA // 

  private actualizarBarraVisual(
    porcentaje: number
  ): void {

    const barra =
      document.querySelector(
        '.barra-progreso'
      ) as HTMLInputElement | null;


    if (!barra) {

      return;

    }


    barra.value =
      porcentaje.toString();


    barra.style.setProperty(
      '--progreso',
      `${porcentaje}%`
    );

  }


  // FORMATEAR TIEMPO //

  private formatearTiempo(
    segundos: number
  ): string {

    if (
      !Number.isFinite(segundos) ||
      segundos < 0
    ) {

      return '0:00';

    }


    const minutos =
      Math.floor(
        segundos / 60
      );


    const segundosRestantes =
      Math.floor(
        segundos % 60
      );


    return `${minutos}:${segundosRestantes
      .toString()
      .padStart(2, '0')}`;

  }


  // DESTRUIR COMPONENTE // 

  ngOnDestroy(): void {

    this.detenerActualizacion();

    this.audio.pause();

    this.audio.src = '';

  }

}