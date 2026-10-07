import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'detalle-lugar/:id',
    loadComponent: () =>
      import('./pages/detalle-lugar/detalle-lugar.page')
        .then((m) => m.DetalleLugarPage),
  },

  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'multimedia',
    loadComponent: () => import('./pages/multimedia/multimedia.page').then( m => m.MultimediaPage)
  },
  {
    path: 'camara',
    loadComponent: () => import('./pages/camara/camara.page').then( m => m.CamaraPage)
  },
  {
    path: 'servicios-api',
    loadComponent: () => import('./pages/servicios-api/servicios-api.page').then( m => m.ServiciosApiPage)
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./pages/configuracion/configuracion.page').then( m => m.ConfiguracionPage)
  },
  
];