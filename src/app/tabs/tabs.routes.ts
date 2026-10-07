import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('../pages/inicio/inicio.page').then((m) => m.InicioPage),
      },
      {
        path: 'explorar',
        loadComponent: () =>
          import('../pages/explorar/explorar.page').then((m) => m.ExplorarPage),
      },
      {
        path: 'mapa',
        loadComponent: () =>
          import('../pages/mapa/mapa.page').then((m) => m.MapaPage),
      },
      {
        path: 'favoritos',
        loadComponent: () =>
          import('../pages/favoritos/favoritos.page').then(
            (m) => m.FavoritosPage
          ),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../pages/perfil/perfil.page').then((m) => m.PerfilPage),
      },
      
      {
        path: 'multimedia',
        loadComponent: () =>
          import('../pages/multimedia/multimedia.page').then(
            (m) => m.MultimediaPage
          ),
        },
        
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full',
  },
];