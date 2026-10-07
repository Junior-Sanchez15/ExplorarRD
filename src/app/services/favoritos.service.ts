import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

import { Lugar } from '../models/lugar.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private readonly CLAVE_FAVORITOS =
    'explorard_favoritos';

  // SUBJECT PARA NOTIFICAR CAMBIOS // 

  private favoritosSubject =
    new BehaviorSubject<Lugar[]>([]);

  favoritos$ =
    this.favoritosSubject.asObservable();

  // IONIC STORAGE // 

  private storage!: Storage;

  private storageReady: Promise<Storage>;


  constructor(
    private storageService: Storage
  ) {

    this.storageReady =
      this.inicializarStorage();

  }

  // INICIALIZAR STORAGE // 

  private async inicializarStorage(): Promise<Storage> {

    this.storage =
      await this.storageService.create();

    const favoritos =
      await this.storage.get(
        this.CLAVE_FAVORITOS
      );

    if (Array.isArray(favoritos)) {

      this.favoritosSubject.next(
        favoritos
      );

    } else {

      this.favoritosSubject.next([]);

    }

    return this.storage;

  }


  // OBTENER FAVORITOS //

  async obtenerFavoritos(): Promise<Lugar[]> {

    const storage =
      await this.storageReady;

    const favoritos =
      await storage.get(
        this.CLAVE_FAVORITOS
      );

    if (!Array.isArray(favoritos)) {

      return [];

    }

    return [...favoritos];

  }


  // VERIFICAR SI ES FAVORITO //

  async esFavorito(
    id: number
  ): Promise<boolean> {

    const favoritos =
      await this.obtenerFavoritos();

    return favoritos.some(
      lugar => lugar.id === id
    );

  }

  // AGREGAR / QUITAR FAVORITO //

  async alternarFavorito(
    lugar: Lugar
  ): Promise<boolean> {

    const favoritos =
      await this.obtenerFavoritos();

    const indice =
      favoritos.findIndex(
        favorito =>
          favorito.id === lugar.id
      );


    // YA EXISTE / QUITAR //

    if (indice !== -1) {

      favoritos.splice(
        indice,
        1
      );

      await this.guardarFavoritos(
        favoritos
      );

      console.log(
        'Favorito eliminado:',
        lugar.nombre
      );

      return false;

    }

    // NO EXISTE / AGREGAR //

    favoritos.push(lugar);

    await this.guardarFavoritos(
      favoritos
    );

    console.log(
      'Favorito agregado:',
      lugar.nombre
    );

    return true;

  }

  // AGREGAR FAVORITO //

  async agregarFavorito(
    lugar: Lugar
  ): Promise<void> {

    const favoritos =
      await this.obtenerFavoritos();

    const existe =
      favoritos.some(
        favorito =>
          favorito.id === lugar.id
      );

    if (existe) {

      return;

    }

    favoritos.push(lugar);

    await this.guardarFavoritos(
      favoritos
    );

  }

  // ELIMINAR FAVORITO // 

  async eliminarFavorito(
    id: number
  ): Promise<void> {

    const favoritos =
      await this.obtenerFavoritos();

    const nuevosFavoritos =
      favoritos.filter(
        lugar =>
          lugar.id !== id
      );

    await this.guardarFavoritos(
      nuevosFavoritos
    );

  }


  // ACTUALIZAR FAVORITO // 

  async actualizarFavorito(
    lugar: Lugar
  ): Promise<void> {

    const favoritos =
      await this.obtenerFavoritos();

    const indice =
      favoritos.findIndex(
        favorito =>
          favorito.id === lugar.id
      );

    if (indice === -1) {

      return;

    }

    favoritos[indice] =
      lugar;

    await this.guardarFavoritos(
      favoritos
    );

  }


  // ELIMINAR TODOS // 

  async eliminarTodos(): Promise<void> {

    const storage =
      await this.storageReady;

    await storage.remove(
      this.CLAVE_FAVORITOS
    );

    this.favoritosSubject.next([]);

  }


  // GUARDAR FAVORITOS // 

  private async guardarFavoritos(
    favoritos: Lugar[]
  ): Promise<void> {

    const storage =
      await this.storageReady;

    await storage.set(
      this.CLAVE_FAVORITOS,
      favoritos
    );


    // ACTUALIZAR AUTOMATICAMENTE LA INTERFAZ //
    
    this.favoritosSubject.next(
      [...favoritos]
    );

  }

}