import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon
} from '@ionic/angular';

import {
  locationOutline,
  navigateOutline
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

import * as L from 'leaflet';

import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

import { Lugar } from '../../models/lugar.model';
import { LugaresService } from '../../services/lugares.service';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon
  ]
})


export class MapaPage implements AfterViewInit, OnDestroy {

  // MAPA // 

  private map!: L.Map;

  private marcadorUsuario?: L.Marker;


  // MARCADORES DE LOS DESTINOS // 

  private marcadoresLugares =
    new Map<number, L.Marker>();


  // LUGAR SELECCIONADO // 

  public lugarSeleccionadoId?: number;


  // LUGARES //

  lugares: Lugar[] = [];


  // ESTADO DE UBICACION // 

  ubicacionObtenida = false;

  cargandoUbicacion = false;

  mensajeUbicacion = '';


  // GEOCERCA //

  readonly radioGeocerca = 500;

  /* Indica si la geocerca esta activa */
  geocercaActiva = false;

  /** Indica si el usuario esta dentro de la geocerca. **/
  dentroGeocerca = false;


  distanciaGeocerca: number | null = null;

 
  mensajeGeocerca = '';


  private circuloGeocerca?: L.Circle;

  /** ID del seguimiento GPS. **/
  private watchIdGeocerca?: string;

  /** Ultima ubicacion conocida. **/
  private ultimaLatitud?: number;

  private ultimaLongitud?: number;

  // CONSTRUCTOR // 

  constructor(
    public lugaresService: LugaresService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {

    addIcons({
      locationOutline,
      navigateOutline
    });


    this.lugares =
      this.lugaresService.obtenerLugares();

    // LEER LUGAR ENVIADO DESDE DETALLE //

    this.route.queryParamMap.subscribe((params) => {

      const id = params.get('lugarId');

      if (id) {

        this.lugarSeleccionadoId =
          Number(id);

        // Si el mapa ya existe,
        // mostrar inmediatamente el lugar.

        if (this.map) {

          setTimeout(() => {

            this.mostrarLugarSeleccionado();

          }, 100);

        }

      }

    });

  }


  // INICIAR MAPA // 

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.inicializarMapa();

    }, 300);

  }


  // CONFIGURAR MAPA // 

  private inicializarMapa(): void {

    this.map = L.map('map', {

      center: [
        18.7357,
        -70.1627
      ],

      zoom: 7,

      zoomControl: false

    });


    // MAPA OPENSTREETMAP // 

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap contributors'
      }
    ).addTo(this.map);

 
    // CONTROLES ZOOM // 

    L.control.zoom({

      position: 'topright'

    }).addTo(this.map);


    // AGREGAR LOS 20 DESTINOS // 

    this.agregarMarcadores();


    // AJUSTAR TAMAÑO // 

    setTimeout(() => {

      this.map.invalidateSize();

    }, 300);


    // MOSTRAR LUGAR SELECCIONADO //

    if (this.lugarSeleccionadoId) {

      setTimeout(() => {

        this.mostrarLugarSeleccionado();

      }, 400);

    }

  }


  // MARCADORES DE LOS 20 DESTINOS // 

  private agregarMarcadores(): void {

    const iconoLugar = L.divIcon({

      className:
        'marcador-personalizado',

      html: `
        <div class="pin-mapa">
          📍
        </div>
      `,

      iconSize: [
        40,
        40
      ],

      iconAnchor: [
        20,
        40
      ],

      popupAnchor: [
        0,
        -38
      ]

    });


    this.lugares.forEach((lugar) => {

      const marcador =
        L.marker(

          [
            lugar.latitud,
            lugar.longitud
          ],

          {
            icon: iconoLugar
          }

        ).addTo(this.map);

      // POPUP // 

      marcador.bindPopup(`

        <div class="popup-lugar">

          <img
            src="${lugar.imagen}"
            alt="${lugar.nombre}"

            style="
              width:100%;
              height:120px;
              object-fit:cover;
              border-radius:8px;
              margin-bottom:8px;
            "
          />

          <strong
            style="
              display:block;
              font-size:16px;
              margin-bottom:4px;
              color:#0b1838;
            "
          >
            ${lugar.nombre}
          </strong>

          <span
            style="
              display:block;
              color:#666;
              font-size:13px;
              margin-bottom:6px;
            "
          >
            ${lugar.ubicacion},
            ${lugar.provincia}
          </span>

          <span
            style="
              color:#f68121;
              font-weight:700;
            "
          >
            ⭐ ${lugar.rating}
          </span>

        </div>

      `);

      // GUARDAR MARCADOR POR ID //

      this.marcadoresLugares.set(
        lugar.id,
        marcador
      );

    });

  }


  // MOSTRAR LUGAR SELECCIONADO // 

  private mostrarLugarSeleccionado(): void {

    if (
      !this.map ||
      !this.lugarSeleccionadoId
    ) {

      return;

    }


    const lugar =
      this.lugaresService.obtenerLugarPorId(
        this.lugarSeleccionadoId
      );


    if (!lugar) {

      console.warn(
        'No se encontró el lugar con ID:',
        this.lugarSeleccionadoId
      );

      return;

    }


    const marcador =
      this.marcadoresLugares.get(
        lugar.id
      );


    if (!marcador) {

      console.warn(
        'No se encontró el marcador del lugar:',
        lugar.nombre
      );

      return;

    }


    console.log(
      'Mostrando lugar en mapa:',
      lugar.nombre
    );


    
    // CENTRAR MAPA // 

    this.map.setView(

      [
        lugar.latitud,
        lugar.longitud
      ],

      15,

      {
        animate: true
      }

    );


    // ABRIR POPUP // 

    setTimeout(() => {

      marcador.openPopup();

    }, 500);


    // SI LA GEOCERCA YA ESTABA ACTIVA,
    // ACTUALIZARLA PARA EL NUEVO DESTINO

    if (this.geocercaActiva) {

      this.dibujarGeocerca();

      this.evaluarGeocerca();

    }

  }

  // MI UBICACION //

  async obtenerMiUbicacion(): Promise<void> {

    // Evitar doble clic mientras busca

    if (this.cargandoUbicacion) {

      return;

    }


    // INICIAR ESTADO DE CARGA // 

    this.cargandoUbicacion = true;

    this.mensajeUbicacion = '';


    // Actualizar inmediatamente el boton

    this.cdr.detectChanges();


    try {

      let posicion;


      // PC / NAVEGADOR // 

      if (!Capacitor.isNativePlatform()) {

        posicion =
          await Geolocation.getCurrentPosition({

            enableHighAccuracy: true,

            timeout: 15000,

            maximumAge: 0

          });

      }

      // ANDROID // 

      else {

        const permiso =
          await Geolocation.checkPermissions();


        if (
          permiso.location !== 'granted'
        ) {

          const solicitado =
            await Geolocation.requestPermissions();


          if (
            solicitado.location !== 'granted'
          ) {

            this.mensajeUbicacion =
              'Permiso de ubicación rechazado. Activa el GPS y permite el acceso a la ubicación.';

            return;

          }

        }


        posicion =
          await Geolocation.getCurrentPosition({

            enableHighAccuracy: true,

            timeout: 15000,

            maximumAge: 0

          });

      }

      // COORDENADAS // 

      const latitud =
        posicion.coords.latitude;

      const longitud =
        posicion.coords.longitude;


      console.log(
        'Latitud:',
        latitud
      );


      console.log(
        'Longitud:',
        longitud
      );


      this.ultimaLatitud = latitud;

      this.ultimaLongitud = longitud;


      // UBICACION ENCONTRADA // 

      this.ubicacionObtenida = true;

      this.mensajeUbicacion =
        'Ubicacion actual detectada correctamente.';


      // ELIMINAR MARCADOR ANTERIOR //

      if (this.marcadorUsuario) {

        this.marcadorUsuario.remove();

      }


      // ICONO AZUL DEL USUARIO // 

      const iconoUsuario = L.divIcon({

        className:
          'marcador-usuario',

        html: `
          <div class="pin-usuario">
            <span class="punto-azul"></span>
          </div>
        `,

        iconSize: [
          40,
          40
        ],

        iconAnchor: [
          20,
          20
        ],

        popupAnchor: [
          0,
          -20
        ]

      });


      // CREAR MARCADOR AZUL // 

      this.marcadorUsuario =
        L.marker(

          [
            latitud,
            longitud
          ],

          {
            icon: iconoUsuario
          }

        )

          .addTo(this.map)

          .bindPopup(`

            <div class="popup-usuario">

              <strong>
                🔵 Tu ubicación
              </strong>

              <span>
                Ubicación actual detectada
              </span>

            </div>

          `);


      this.marcadorUsuario.openPopup();

      // CENTRAR MAPA // 

      this.map.setView(

        [
          latitud,
          longitud
        ],

        15,

        {
          animate: true
        }

      );


      // ACTUALIZAR GEOCERCA // 

      if (this.geocercaActiva) {

        this.evaluarGeocerca();

      }


    } catch (error: any) {

      console.error(
        'Error obteniendo ubicación:',
        error
      );


      this.ubicacionObtenida = false;


      if (error?.message) {

        this.mensajeUbicacion =
          `No se pudo obtener la ubicacion: ${error.message}`;

      } else {

        this.mensajeUbicacion =
          'No se pudo obtener tu ubicacion. Verifica que el navegador tenga permiso para acceder a la ubicacion.';

      }


    } finally {

      // VOLVER AL ESTADO NORMAL // 

      this.cargandoUbicacion = false;


      // Forzar actualización visual

      this.cdr.detectChanges();

    }

  }


  // ACTIVAR GEOCERCA //

  async activarGeocerca(): Promise<void> {

    // Verificar que exista un destino seleccionado //

    if (!this.lugarSeleccionadoId) {

      this.mensajeGeocerca =
        'Primero selecciona un destino en el mapa.';

      this.cdr.detectChanges();

      return;

    }


    const lugar =
      this.lugaresService.obtenerLugarPorId(
        this.lugarSeleccionadoId
      );


    if (!lugar) {

      this.mensajeGeocerca =
        'No fue posible encontrar el destino seleccionado.';

      this.cdr.detectChanges();

      return;

    }


    // Obtener ubicacion si todavia no existe // 

    if (
      this.ultimaLatitud === undefined ||
      this.ultimaLongitud === undefined
    ) {

      await this.obtenerMiUbicacion();

    }


    if (
      this.ultimaLatitud === undefined ||
      this.ultimaLongitud === undefined
    ) {

      this.mensajeGeocerca =
        'No fue posible obtener tu ubicación para activar la geocerca.';

      this.cdr.detectChanges();

      return;

    }


    this.geocercaActiva = true;

    this.mensajeGeocerca =
      `Geocerca activa alrededor de ${lugar.nombre}.`;



    this.dibujarGeocerca();


    this.evaluarGeocerca();

    // Iniciar seguimiento GPS //

    await this.iniciarSeguimientoGeocerca();


    this.cdr.detectChanges();

  }


  // DIBUJAR GEOCERCA // 

  private dibujarGeocerca(): void {

    if (!this.map || !this.lugarSeleccionadoId) {

      return;

    }


    const lugar =
      this.lugaresService.obtenerLugarPorId(
        this.lugarSeleccionadoId
      );


    if (!lugar) {

      return;

    }


    // Eliminar circulo anterior //

    if (this.circuloGeocerca) {

      this.circuloGeocerca.remove();

    }


    // Crear nuevo circulo // 

    this.circuloGeocerca =
      L.circle(

        [
          lugar.latitud,
          lugar.longitud
        ],

        {
          radius: this.radioGeocerca,

          color: '#f68121',

          weight: 3,

          opacity: 0.9,

          fillColor: '#f68121',

          fillOpacity: 0.15

        }

      ).addTo(this.map);


    this.circuloGeocerca.bindPopup(`

      <strong>
        📍 Geocerca
      </strong>

      <br>

      ${lugar.nombre}

      <br>

      Radio:
      ${this.radioGeocerca} metros

    `);

  }


  // EVALUAR GEOCERCA // 

  private evaluarGeocerca(): void {

    if (
      !this.geocercaActiva ||
      !this.lugarSeleccionadoId ||
      this.ultimaLatitud === undefined ||
      this.ultimaLongitud === undefined
    ) {

      return;

    }


    const lugar =
      this.lugaresService.obtenerLugarPorId(
        this.lugarSeleccionadoId
      );


    if (!lugar) {

      return;

    }


    // Calcular distancia //

    const distancia =
      this.calcularDistancia(

        this.ultimaLatitud,

        this.ultimaLongitud,

        lugar.latitud,

        lugar.longitud

      );


    this.distanciaGeocerca =
      Math.round(distancia);


    const estabaDentro =
      this.dentroGeocerca;


    this.dentroGeocerca =
      distancia <= this.radioGeocerca;


    // Mensaje // 

    if (this.dentroGeocerca) {

      this.mensajeGeocerca =
        `Estas dentro de la geocerca de ${lugar.nombre}. Distancia: ${this.formatearDistancia(distancia)}.`;

    } else {

      this.mensajeGeocerca =
        `Estas fuera de la geocerca. Distancia a ${lugar.nombre}: ${this.formatearDistancia(distancia)}.`;

    }


    // Detectar entrada/salida // 

    if (
      !estabaDentro &&
      this.dentroGeocerca
    ) {

      console.log(
        `🟢 Entraste a la geocerca de ${lugar.nombre}`
      );

    }


    if (
      estabaDentro &&
      !this.dentroGeocerca
    ) {

      console.log(
        `🔵 Saliste de la geocerca de ${lugar.nombre}`
      );

    }


    this.cdr.detectChanges();

  }


  // CALCULAR DISTANCIA HAVERSINE //

  private calcularDistancia(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {

    const radioTierra = 6371000;


    const diferenciaLatitud =
      this.gradosARadianes(
        lat2 - lat1
      );


    const diferenciaLongitud =
      this.gradosARadianes(
        lon2 - lon1
      );


    const latitud1 =
      this.gradosARadianes(lat1);


    const latitud2 =
      this.gradosARadianes(lat2);


    const a =
      Math.sin(
        diferenciaLatitud / 2
      ) *
      Math.sin(
        diferenciaLatitud / 2
      ) +

      Math.cos(latitud1) *
      Math.cos(latitud2) *

      Math.sin(
        diferenciaLongitud / 2
      ) *
      Math.sin(
        diferenciaLongitud / 2
      );


    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );


    return radioTierra * c;

  }


  private gradosARadianes(
    grados: number
  ): number {

    return grados * Math.PI / 180;

  }

  // FORMATEAR DISTANCIA // 

  private formatearDistancia(
    distancia: number
  ): string {

    if (distancia < 1000) {

      return `${Math.round(distancia)} m`;

    }


    return `${(distancia / 1000).toFixed(2)} km`;

  }


  // INICIAR SEGUIMIENTO DE GEOCERCA //

  private async iniciarSeguimientoGeocerca(): Promise<void> {

  
    // Evitar crear varios seguimientos // 

    if (this.watchIdGeocerca) {

      return;

    }


    try {

      this.watchIdGeocerca =
        await Geolocation.watchPosition(

          {
            enableHighAccuracy: true,

            timeout: 15000,

            maximumAge: 0

          },

          (position, error) => {

            if (error) {

              console.error(
                'Error en seguimiento GPS:',
                error
              );

              return;

            }


            if (!position) {

              return;

            }

            this.ultimaLatitud =
              position.coords.latitude;

            this.ultimaLongitud =
              position.coords.longitude;


            this.actualizarMarcadorUsuario(

              this.ultimaLatitud,

              this.ultimaLongitud

            );

            // Evaluar geocerca // 

            this.evaluarGeocerca();


            this.cdr.detectChanges();

          }

        );


      console.log(
        '📍 Seguimiento de geocerca iniciado:',
        this.watchIdGeocerca
      );


    } catch (error) {

      console.error(
        'No fue posible iniciar el seguimiento GPS:',
        error
      );

      this.mensajeGeocerca =
        'No fue posible iniciar el seguimiento de ubicación.';

      this.cdr.detectChanges();

    }

  }

  // ACTUALIZAR MARCADOR DEL USUARIO //

  private actualizarMarcadorUsuario(
    latitud: number,
    longitud: number
  ): void {

    if (!this.map) {

      return;

    }


    if (this.marcadorUsuario) {

      this.marcadorUsuario.setLatLng(
        [
          latitud,
          longitud
        ]
      );

      return;

    }

    // Crear marcador si todavia no existe //

    const iconoUsuario = L.divIcon({

      className:
        'marcador-usuario',

      html: `
        <div class="pin-usuario">
          <span class="punto-azul"></span>
        </div>
      `,

      iconSize: [
        40,
        40
      ],

      iconAnchor: [
        20,
        20
      ],

      popupAnchor: [
        0,
        -20
      ]

    });


    this.marcadorUsuario =
      L.marker(

        [
          latitud,
          longitud
        ],

        {
          icon: iconoUsuario
        }

      ).addTo(this.map)

        .bindPopup(`

          <div class="popup-usuario">

            <strong>
              🔵 Tu ubicación
            </strong>

            <span>
              Ubicación actual detectada
            </span>

          </div>

        `);

  }


  // DESACTIVAR GEOCERCA // 

  async desactivarGeocerca(): Promise<void> {

    this.geocercaActiva = false;

    this.dentroGeocerca = false;

    this.distanciaGeocerca = null;

    this.mensajeGeocerca =
      'Geocerca desactivada.';


    // Detener seguimiento GPS //

    await this.detenerSeguimientoGeocerca();


    // Eliminar circulo //

    if (this.circuloGeocerca) {

      this.circuloGeocerca.remove();

      this.circuloGeocerca = undefined;

    }


    this.cdr.detectChanges();

  }


  private async detenerSeguimientoGeocerca(): Promise<void> {

    if (!this.watchIdGeocerca) {

      return;

    }


    try {

      await Geolocation.clearWatch({

        id: this.watchIdGeocerca

      });


      console.log(
        '📍 Seguimiento de geocerca detenido.'
      );


    } catch (error) {

      console.error(
        'Error deteniendo seguimiento GPS:',
        error
      );

    } finally {

      this.watchIdGeocerca =
        undefined;

    }

  }

  // DESTRUIR MAPA // 

  ngOnDestroy(): void {

    // -------------------------------------------------------
    // Detener seguimiento GPS
    // -------------------------------------------------------

    this.detenerSeguimientoGeocerca();

    // Eliminar circulo //
    if (this.circuloGeocerca) {

      this.circuloGeocerca.remove();

      this.circuloGeocerca = undefined;

    }

    // Eliminar mapa // 

    if (this.map) {

      this.map.remove();

    }

  }

}