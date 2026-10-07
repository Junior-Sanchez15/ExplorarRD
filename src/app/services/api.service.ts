import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { Storage } from '@ionic/storage-angular';


export interface PublicacionAPI {
  userId?: number;
  id?: number;
  title: string;
  body: string;
}


export interface ResultadoAPI {
  id: number;
  titulo: string;
  contenido: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API // 

  private readonly API_URL =
    'https://jsonplaceholder.typicode.com/posts';


  // CACHE // 

  private readonly CLAVE_CACHE =
    'explorard_api_cache';

  // ESTADOS // 

  private cargandoSubject =
    new BehaviorSubject<boolean>(false);

  cargando$ =
    this.cargandoSubject.asObservable();


  private errorSubject =
    new BehaviorSubject<string>('');

  error$ =
    this.errorSubject.asObservable();


  private publicacionesSubject =
    new BehaviorSubject<ResultadoAPI[]>([]);

  publicaciones$ =
    this.publicacionesSubject.asObservable();


  // STORAGE // 

  private storage!: Storage;

  private storageReady: Promise<Storage>;


  constructor(
    private http: HttpClient,
    private storageService: Storage
  ) {

    this.storageReady =
      this.inicializarStorage();

  }

  // INICIALIZAR STORAGE // 

  private async inicializarStorage(): Promise<Storage> {

    this.storage =
      await this.storageService.create();

    return this.storage;

  }


  // GET // 

  async obtenerPublicaciones(): Promise<ResultadoAPI[]> {

    this.cargandoSubject.next(true);

    this.errorSubject.next('');


    try {

      console.log(
        ' Iniciando GET:',
        this.API_URL
      );


      const respuesta =
        await firstValueFrom(

          this.http.get<PublicacionAPI[]>(
            this.API_URL,
            {
              timeout: 8000
            }
          )

        );


      console.log(
        ' GET recibido:',
        respuesta.length,
        'registros'
      );


      const datos: ResultadoAPI[] =
        respuesta.map(
          publicacion => ({

            id:
              publicacion.id ?? 0,

            titulo:
              publicacion.title,

            contenido:
              publicacion.body

          })
        );


      this.publicacionesSubject.next(
        datos
      );

      // GUARDAR CACHE // 

      try {

        const storage =
          await this.storageReady;

        await storage.set(
          this.CLAVE_CACHE,
          datos
        );

        console.log(
          'Caché actualizada.'
        );

      } catch (error) {

        console.warn(
          'No fue posible guardar la caché:',
          error
        );

      }


      return datos;

    } catch (error) {

      console.error(
        'Error en GET:',
        error
      );


      const mensaje =
        this.obtenerMensajeError(error);


      this.errorSubject.next(
        mensaje
      );

      // INTENTAR CACHE // 

      const cache =
        await this.obtenerCache();


      if (cache.length > 0) {

        console.log(
          ' Mostrando datos desde cache.'
        );


        this.publicacionesSubject.next(
          cache
        );


        return cache;

      }


      return [];

    } finally {

      this.cargandoSubject.next(false);

    }

  }

  // POST // 

  async crearPublicacion(
    titulo: string,
    contenido: string
  ): Promise<ResultadoAPI | null> {

    this.cargandoSubject.next(true);

    this.errorSubject.next('');


    try {

      const nuevaPublicacion: PublicacionAPI = {

        title:
          titulo,

        body:
          contenido,

        userId:
          1

      };


      console.log(
        ' Iniciando POST:',
        nuevaPublicacion
      );


      const respuesta =
        await firstValueFrom(

          this.http.post<PublicacionAPI>(
            this.API_URL,
            nuevaPublicacion,
            {
              timeout: 8000
            }
          )

        );


      console.log(
        ' POST recibido:',
        respuesta
      );


      const resultado: ResultadoAPI = {

        id:
          respuesta.id ?? Date.now(),

        titulo:
          respuesta.title,

        contenido:
          respuesta.body

      };

      // ACTUALIZAR LISTA // 

      const listaActual =
        this.publicacionesSubject.value;


      const nuevaLista =
        [
          resultado,
          ...listaActual
        ];


      this.publicacionesSubject.next(
        nuevaLista
      );

      // ACTUALIZAR CACHE// 

      try {

        const storage =
          await this.storageReady;

        await storage.set(
          this.CLAVE_CACHE,
          nuevaLista
        );

      } catch (error) {

        console.warn(
          'No fue posible actualizar la cache:',
          error
        );

      }


      return resultado;

    } catch (error) {

      console.error(
        'Error en POST:',
        error
      );


      this.errorSubject.next(
        this.obtenerMensajeError(error)
      );


      return null;

    } finally {

      this.cargandoSubject.next(false);

    }

  }

  // CACHE //
  private async obtenerCache(): Promise<ResultadoAPI[]> {

    try {

      const storage =
        await this.storageReady;


      const cache =
        await storage.get(
          this.CLAVE_CACHE
        );


      if (Array.isArray(cache)) {

        return cache;

      }


      return [];

    } catch (error) {

      console.error(
        ' Error leyendo cache:',
        error
      );


      return [];

    }

  }

  // MENSAJES DE ERROR // 

  private obtenerMensajeError(
    error: unknown
  ): string {

    if (
      error instanceof HttpErrorResponse
    ) {

      if (error.status === 0) {

        return (
          'No se pudo conectar con el servidor. ' +
          'Verifica tu conexion a Internet.'
        );

      }


      if (
        error.status >= 400 &&
        error.status < 500
      ) {

        return (
          `La solicitud fue rechazada (${error.status}).`
        );

      }


      if (error.status >= 500) {

        return (
          `El servidor presento un problema (${error.status}).`
        );

      }

    }


    return (
      'La solicitud tardo demasiado o ocurrio un error inesperado.'
    );

  }

  // LIMPIAR ERROR // 

  limpiarError(): void {

    this.errorSubject.next('');

  }


  // LIMPIAR CACHE //

  async limpiarCache(): Promise<void> {

    try {

      const storage =
        await this.storageReady;


      await storage.remove(
        this.CLAVE_CACHE
      );


      this.publicacionesSubject.next([]);


    } catch (error) {

      console.error(
        'Error eliminando cache:',
        error
      );

    }

  }

}