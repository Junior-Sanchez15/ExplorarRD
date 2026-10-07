import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonInput,
  IonTextarea,
  IonSpinner,
  IonBadge,
  IonList,
  IonItem,
  IonLabel,
  IonRefresher,
  IonRefresherContent
} from '@ionic/angular';

import {
  cloudDownloadOutline,
  cloudUploadOutline,
  refreshOutline,
  wifiOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  serverOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import {
  ApiService,
  ResultadoAPI
} from '../../services/api.service';


@Component({
  selector: 'app-servicios-api',

  templateUrl: './servicios-api.page.html',

  styleUrls: ['./servicios-api.page.scss'],

  standalone: true,

  imports: [

    CommonModule,
    FormsModule,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,

    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,

    IonButton,
    IonIcon,

    IonInput,
    IonTextarea,

    IonSpinner,
    IonBadge,

    IonList,
    IonItem,
    IonLabel,

    IonRefresher,
    IonRefresherContent

  ]
})


export class ServiciosApiPage implements OnInit {

  // DATOS DE LA API // 

  publicaciones: ResultadoAPI[] = [];


  // ESTADOS // 

  cargando = false;

  error = '';

  mensaje = '';

  // DATOS PARA POST // 

  titulo = '';

  contenido = '';

  // CONSTRUCTOR //

  constructor(

    private apiService: ApiService,

    private changeDetector: ChangeDetectorRef

  ) {

    addIcons({

      cloudDownloadOutline,

      cloudUploadOutline,

      refreshOutline,

      wifiOutline,

      alertCircleOutline,

      checkmarkCircleOutline,

      serverOutline

    });

  }


  // INICIO DE LA PAGINA //

  ngOnInit(): void {

    console.log(
      'Servicios API iniciada'
    );

    this.cargarDatos();

  }


  // GET // 

  async cargarDatos(): Promise<void> {

    console.log(
      ' Iniciando carga de datos...'
    );


    // Activar estado de carga

    this.cargando = true;

    this.error = '';

    this.mensaje = '';


    // Forzar actualizacion visual

    this.changeDetector.detectChanges();


    try {

      console.log(
        'Solicitando informacion a la API...'
      );


      const datos =
        await this.apiService.obtenerPublicaciones();


      console.log(
        'Datos recibidos en la pagina:',
        datos.length
      );


      // Actualizar resultados

      this.publicaciones = [
        ...datos
      ];


      // Mostrar mensaje de exito

      if (datos.length > 0) {

        this.mensaje =
          'Datos obtenidos correctamente desde la API.';

      }


    } catch (error) {

      console.error(
        'Error cargando datos en la pagina:',
        error
      );


      this.error =
        'No fue posible obtener los datos.';


    } finally {


      // Finalizar carga

      console.log(
        'Finalizando carga...'
      );


      this.cargando = false;


      // Forzar actualizacion de la interfaz

      this.changeDetector.detectChanges();


      console.log(
        'Estado cargando:',
        this.cargando
      );

    }

  }


  // POST // 

  async enviarDatos(): Promise<void> {

    console.log(
      'Preparando envio POST...'
    );


    this.error = '';

    this.mensaje = '';


    // Limpiar espacios

    const tituloLimpio =
      this.titulo.trim();

    const contenidoLimpio =
      this.contenido.trim();


    // VALIDACION //

    if (
      !tituloLimpio ||
      !contenidoLimpio
    ) {

      this.error =
        'Completa el titulo y el contenido antes de enviar.';


      return;

    }


    // Activar carga

    this.cargando = true;


    this.changeDetector.detectChanges();


    try {

      console.log(
        'Enviando informacion mediante POST...'
      );


      const resultado =
        await this.apiService.crearPublicacion(

          tituloLimpio,

          contenidoLimpio

        );


      // POST EXITOSO // 

      if (resultado) {

        console.log(
          'POST completado:',
          resultado
        );


        this.publicaciones = [

          resultado,

          ...this.publicaciones

        ];


        this.mensaje =
          'Informacion enviada correctamente mediante POST.';


        // Limpiar formulario

        this.titulo = '';

        this.contenido = '';


      } else {


        this.error =
          'No fue posible enviar la informacion.';

      }


    } catch (error) {


      console.error(
        'Error enviando datos:',
        error
      );


      this.error =
        'No fue posible realizar el envio.';


    } finally {


      console.log(
        ' Finalizando POST...'
      );


      this.cargando = false;


      this.changeDetector.detectChanges();


      console.log(
        'Estado cargando despues del POST:',
        this.cargando
      );

    }

  }

  // ACTUALIZAR DATOS // 

  async actualizar(): Promise<void> {

    console.log(
      'Actualizando informacion...'
    );


    await this.cargarDatos();

  }


  // PULL TO REFRESH //

  async refrescar(
    event: any
  ): Promise<void> {

    console.log(
      'Actualizando mediante Pull to Refresh...'
    );


    try {

      await this.cargarDatos();

    } finally {

      event.target.complete();

    }

  }


  // LIMPIAR MENSAJES // 

  limpiarMensajes(): void {

    this.error = '';

    this.mensaje = '';

    this.apiService.limpiarError();


    this.changeDetector.detectChanges();

  }

}