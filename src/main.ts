import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  PreloadAllModules
} from '@angular/router';

import { provideHttpClient } from '@angular/common/http';

import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';

import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, {

  providers: [

    // ESTRATEGIA DE NAVEGACION DE IONIC // 

    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },


    // IONIC ANGULAR // 

    provideIonicAngular(),


    // ROUTER // 

    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    ),


    // HTTP CLIENT
    // REST API

    provideHttpClient(),
    
  
    // IONIC STORAGE // 

    importProvidersFrom(
      IonicStorageModule.forRoot()
    )

  ]

});