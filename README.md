# 🇩🇴 ExploraRD

## Descubre República Dominicana

**ExploraRD** es una aplicación móvil desarrollada con **Ionic, Angular y Capacitor**, orientada al turismo de la República Dominicana.

La aplicación permite explorar destinos turísticos, consultar información de lugares, visualizar ubicaciones en un mapa interactivo, utilizar la geolocalización, administrar favoritos, consultar contenido multimedia, utilizar la cámara y código QR, consumir servicios REST, comprobar la conectividad y utilizar Bluetooth Low Energy.

El proyecto fue desarrollado como trabajo final de la asignatura:

**Programación de Dispositivos Móviles — ISW-307**

---

# Información general del proyecto

| Información | Detalle |
|---|---|
| Nombre | ExploraRD |
| Descripción | Aplicación móvil turística de República Dominicana |
| Framework | Ionic |
| Frontend | Angular |
| Desarrollo móvil | Capacitor |
| Lenguaje | TypeScript |
| Plataforma principal | Android |
| Base de datos local | Ionic Storage |
| Mapas | Leaflet + OpenStreetMap |
| API REST | JSONPlaceholder |
| Geolocalización | Capacitor Geolocation |
| Bluetooth | Bluetooth Low Energy |
| Cámara | Capacitor Camera |
| Código QR | Capacitor ML Kit Barcode Scanning |
| Repositorio | https://github.com/Junior-Sanchez15/ExploraRD.git |

---

# Objetivo general

Desarrollar una aplicación móvil turística que permita a los usuarios descubrir y consultar diferentes destinos de la República Dominicana mediante una interfaz moderna, intuitiva y funcional, integrando diferentes tecnologías y funcionalidades móviles.

---

# Objetivos específicos

- Crear una aplicación móvil utilizando Ionic, Angular y Capacitor.
- Implementar navegación mediante pestañas y rutas.
- Presentar información de diferentes destinos turísticos.
- Implementar búsqueda y filtrado de destinos.
- Integrar un mapa interactivo.
- Utilizar la geolocalización del dispositivo.
- Implementar una geocerca para detectar la proximidad a destinos.
- Permitir guardar destinos como favoritos.
- Implementar almacenamiento persistente.
- Comprobar el estado de conectividad del dispositivo.
- Integrar Bluetooth Low Energy.
- Implementar reproducción de audio y video.
- Utilizar la cámara del dispositivo.
- Implementar lectura de códigos QR.
- Consumir servicios web mediante una API REST.
- Implementar operaciones GET y POST.
- Incorporar modo oscuro.
- Aplicar una arquitectura organizada y modular.

---

# 🇩🇴 Descripción de ExploraRD

ExploraRD permite descubrir diferentes lugares turísticos de la República Dominicana organizados por categorías.

El usuario puede consultar información detallada de cada destino, visualizar su ubicación, guardar lugares como favoritos y acceder a diferentes funcionalidades relacionadas con dispositivos móviles.

La aplicación contiene información de **20 destinos turísticos y gastronómicos**.

---

# Destinos turísticos

La aplicación incluye los siguientes destinos:

1. Bahía de las Águilas
2. Playa Bávaro
3. Playa Rincón
4. Playa Macao
5. Pico Duarte
6. Valle Nuevo
7. Jarabacoa
8. 27 Charcos de Damajagua
9. Los Haitises
10. Zona Colonial
11. Altos de Chavón
12. Basílica de Higüey
13. Samaná
14. Punta Cana
15. Puerto Plata
16. Adrian Tropical
17. El Conuco
18. Mesón de Bari
19. Jalao
20. Villar Hermanos

---

# Categorías

Los destinos están organizados en diferentes categorías:

- 🏖️ Playas
- ⛰️ Montañas
- 🌿 Naturaleza
- 🏛️ Cultura
- 🍽️ Gastronomía

---

# Funcionalidades principales

## 1. Inicio

La pantalla principal presenta:

- Bienvenida a ExploraRD.
- Destinos destacados.
- Categorías.
- Acceso rápido a diferentes funcionalidades.
- Tarjetas de destinos.
- Navegación hacia el detalle de cada lugar.
- Pull-to-refresh.
- Interacción mediante gestos.

---

## 2. Explorar

La sección Explorar permite:

- Consultar los destinos disponibles.
- Buscar destinos.
- Filtrar por categoría.
- Visualizar tarjetas.
- Acceder al detalle de cada destino.
- Utilizar gestos de desplazamiento.

---

## 3. Detalle del destino

Cada destino cuenta con una pantalla de detalle donde se muestra:

- Nombre del destino.
- Imagen.
- Ubicación.
- Provincia.
- Categoría.
- Calificación.
- Descripción.
- Botón para agregar o eliminar de favoritos.
- Botón para visualizar el lugar en el mapa.
- Opción para compartir.

---

## 4. Mapa interactivo

ExploraRD integra un mapa interactivo utilizando:

- Leaflet.
- OpenStreetMap.
- Marcadores personalizados.
- Ubicación actual del usuario.
- Información de los destinos.
- Navegación desde el detalle hacia el mapa.

El mapa contiene marcadores correspondientes a los destinos disponibles en la aplicación.

---

## 5. Geolocalización

La aplicación utiliza la ubicación del dispositivo para:

- Obtener la posición actual.
- Mostrar la ubicación del usuario en el mapa.
- Actualizar la posición.
- Permitir utilizar funcionalidades relacionadas con la proximidad.
- Comprobar el permiso de ubicación.

---

## 6. Geocerca

ExploraRD incorpora una funcionalidad de geocerca.

La aplicación utiliza un radio de proximidad alrededor de un destino seleccionado para determinar si el usuario se encuentra dentro o fuera de la zona establecida.

La geocerca permite:

- Activar el seguimiento.
- Mostrar un círculo en el mapa.
- Calcular la distancia al destino.
- Detectar si el usuario está dentro del radio.
- Actualizar la posición.
- Desactivar la geocerca.

---

## 7. Favoritos

Los usuarios pueden guardar destinos como favoritos.

Las operaciones disponibles incluyen:

- Agregar favorito.
- Consultar favoritos.
- Verificar si un destino es favorito.
- Eliminar favorito.
- Actualizar favorito.
- Eliminar todos los favoritos.

Los favoritos permanecen almacenados aunque se cierre la aplicación.

---

## 8. Almacenamiento persistente

La aplicación utiliza **Ionic Storage** para conservar información localmente.

Actualmente se utiliza para almacenar los destinos favoritos.

La información permanece disponible después de cerrar y volver a abrir la aplicación.

La clave utilizada para los favoritos es:

```text
explorard_favoritos
```

---

## 9. Perfil

La pantalla de Perfil presenta información general del usuario y del funcionamiento de la aplicación.

Incluye:

- Información del usuario.
- Cantidad de destinos.
- Cantidad de categorías.
- País.
- Estado de ubicación.
- Estado de conectividad.
- Bluetooth.
- Dispositivos Bluetooth encontrados.
- Acceso a multimedia.
- Acceso a servicios web.
- Acceso a cámara y código QR.
- Acceso a configuración.
- Información general de la aplicación.

---

## 10. Conectividad

La aplicación comprueba el estado de conexión del dispositivo.

Se utiliza Capacitor Network para detectar:

- Estado online.
- Estado offline.
- Tipo de conexión.

También se manejan cambios de conectividad durante la ejecución de la aplicación.

---

## 11. Bluetooth Low Energy

ExploraRD integra Bluetooth Low Energy mediante:

```text
@capacitor-community/bluetooth-le
```

La funcionalidad permite:

- Comprobar el estado de Bluetooth.
- Solicitar activación cuando corresponde.
- Buscar dispositivos BLE.
- Mostrar dispositivos encontrados.
- Mostrar nombre cuando el dispositivo lo proporciona.
- Mostrar el identificador del dispositivo.
- Consultar dispositivos vinculados en Android.

Si un dispositivo BLE no proporciona un nombre durante el escaneo, se muestra:

```text
Nombre no disponible
```

---

## 12. Multimedia

La aplicación incluye una sección multimedia con contenido relacionado con República Dominicana.

### Audio

Se implementa un reproductor de audio con:

- Reproducir.
- Pausar.
- Detener.
- Control de volumen.
- Barra de progreso.
- Tiempo actual.
- Duración.

Archivo utilizado:

```text
src/assets/audio/atlas-dominican-republic.mp3
```

### Video

Se incorpora reproducción de video mediante controles HTML5.

Archivo utilizado:

```text
src/assets/video/explorard-destino.mp4
```

---

## 13. Cámara

La aplicación integra la cámara mediante Capacitor.

Las funciones disponibles incluyen:

- Tomar fotografías.
- Seleccionar imágenes desde la galería.
- Visualizar fotografías.
- Eliminar fotografías.

Plugin utilizado:

```text
@capacitor/camera
```

---

## 14. Código QR

ExploraRD incorpora lectura de códigos QR mediante:

```text
@capacitor-mlkit/barcode-scanning
```

Esta funcionalidad permite utilizar el dispositivo para escanear códigos y obtener la información contenida en ellos.

---

## 15. Servicios REST

La aplicación consume una API REST mediante `HttpClient`.

Se implementan operaciones:

- GET.
- POST.
- Indicador de carga.
- Manejo de errores.
- Almacenamiento en caché.
- Pull-to-refresh.

API utilizada durante el desarrollo:

```text
https://jsonplaceholder.typicode.com/posts
```

### GET

La aplicación consulta publicaciones mediante:

```text
GET /posts
```

### POST

También permite enviar una nueva publicación mediante:

```text
POST /posts
```

La API de JSONPlaceholder es una API de prueba, por lo que los registros enviados mediante POST no se almacenan permanentemente en un servidor real.

---

## 16. Modo oscuro

ExploraRD incluye modo oscuro para mejorar la experiencia visual del usuario.

El modo oscuro modifica diferentes elementos de la aplicación, incluyendo:

- Fondo.
- Textos.
- Tarjetas.
- Botones.
- Menús.
- Etiquetas.
- Categorías.
- Componentes Ionic.

La configuración se aplica de manera global a la aplicación.

---

# Navegación

La aplicación utiliza navegación mediante tabs.

Las pestañas principales son:

```text
Inicio
Explorar
Mapa
Favoritos
Perfil
```

También existen páginas adicionales:

```text
Detalle del destino
Multimedia
Cámara
Servicios REST
Configuración
```

Las páginas utilizan lazy loading mediante rutas dinámicas.

Ejemplo:

```ts
{
  path: 'multimedia',
  loadComponent: () =>
    import('./pages/multimedia/multimedia.page')
      .then(m => m.MultimediaPage)
}
```

---

# Arquitectura

El proyecto utiliza una arquitectura organizada basada en:

```text
ExploraRD
│
├── pages
│   ├── inicio
│   ├── explorar
│   ├── mapa
│   ├── favoritos
│   ├── perfil
│   ├── detalle-lugar
│   ├── multimedia
│   ├── camara
│   ├── servicios-api
│   └── configuracion
│
├── services
│   ├── lugares.service.ts
│   ├── favoritos.service.ts
│   ├── conectividad.service.ts
│   ├── bluetooth.service.ts
│   └── api.service.ts
│
├── models
│   └── lugar.model.ts
│
├── assets
│   ├── images
│   ├── audio
│   └── video
│
├── tabs
│
└── app
```

La separación permite mantener organizadas las interfaces, servicios, modelos y recursos de la aplicación.

---

# Tecnologías utilizadas

## Ionic

Framework utilizado para desarrollar la interfaz móvil.

## Angular

Framework utilizado para la estructura de la aplicación, componentes, navegación y servicios.

## Capacitor

Utilizado para acceder a funcionalidades nativas del dispositivo.

## TypeScript

Lenguaje principal utilizado para la programación.

## Leaflet

Biblioteca utilizada para implementar el mapa interactivo.

## OpenStreetMap

Fuente utilizada para los mapas.

## Ionic Storage

Utilizado para el almacenamiento persistente local.

## Capacitor Geolocation

Utilizado para obtener la ubicación del dispositivo.

## Capacitor Network

Utilizado para comprobar la conectividad.

## Bluetooth LE

Utilizado para detectar dispositivos Bluetooth Low Energy.

## Capacitor Camera

Utilizado para acceder a la cámara y galería.

## Capacitor ML Kit Barcode Scanning

Utilizado para el escaneo de códigos QR.

---

# Dependencias principales

Las principales dependencias utilizadas en el proyecto incluyen:

```json
{
  "@angular/core": "^22.1.7",
  "@ionic/angular": "^9.0.6",
  "@capacitor/core": "^8.5.2",
  "@capacitor/android": "^8.5.2",
  "@capacitor/geolocation": "^8.0.0",
  "@capacitor/network": "^8.0.0",
  "@capacitor/camera": "^8.0.0",
  "@ionic/storage-angular": "^4.0.0",
  "@capacitor-community/bluetooth-le": "^7.1.1",
  "@capacitor-mlkit/barcode-scanning": "^7.0.0",
  "leaflet": "^1.9.4"
}
```

---

# Estructura del proyecto

```text
ExploraRD/
│
├── android/
│
├── src/
│   ├── app/
│   │   ├── models/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── tabs/
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── ...
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── audio/
│   │   └── video/
│   │
│   ├── theme/
│   ├── global.scss
│   └── main.ts
│
├── angular.json
├── capacitor.config.ts
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

---

# Requisitos para ejecutar el proyecto

Para ejecutar ExploraRD se recomienda tener instalado:

- Node.js.
- npm.
- Ionic CLI.
- Angular CLI.
- Git.
- Android Studio.
- JDK 21.
- Android SDK.
- Capacitor.

Versiones utilizadas durante el desarrollo:

```text
Node.js
npm
Ionic CLI 7.2.1
Angular 22
Ionic 9
Capacitor 8
JDK 21
```

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Junior-Sanchez15/ExploraRD.git
```

Entrar al proyecto:

```bash
cd ExploraRD
```

Instalar las dependencias:

```bash
npm install
```

Instalar Ionic CLI si no está instalado:

```bash
npm install -g @ionic/cli
```

---

# Ejecutar en navegador

Para ejecutar la aplicación en el navegador:

```bash
ionic serve
```

La aplicación estará disponible normalmente en:

```text
http://localhost:8100
```

---

# Preparar Android

Para sincronizar el proyecto con Android:

```bash
ionic build
```

Después:

```bash
npx cap sync android
```

Para abrir el proyecto en Android Studio:

```bash
npx cap open android
```

También es posible ejecutar directamente:

```bash
npx cap run android
```

---

# Actualizar la aplicación Android

Después de realizar modificaciones en el código:

```bash
ionic build
```

Luego:

```bash
npx cap sync android
```

Finalmente:

```bash
npx cap open android
```

De esta manera se actualiza el proyecto Android con los cambios realizados en Ionic.

---

# Pruebas realizadas

La aplicación fue probada en:

- Navegador web.
- Dispositivo Android físico.

Dispositivo Android utilizado durante las pruebas:

```text
nubia NX789J
Android 16
API 36
```

Se realizaron pruebas de:

- Navegación.
- Tabs.
- Búsqueda.
- Filtrado.
- Tarjetas.
- Pull-to-refresh.
- Gestos.
- Detalle de destinos.
- Favoritos.
- Persistencia.
- Mapa.
- Marcadores.
- GPS.
- Geocerca.
- Conectividad.
- Bluetooth LE.
- Audio.
- Video.
- Cámara.
- Galería.
- Código QR.
- API REST.
- GET.
- POST.
- Modo oscuro.
- Configuración.

---

# Integración de las unidades del curso

## Unidad I — Introducción al desarrollo móvil

Se desarrolló una aplicación móvil utilizando Ionic y Angular.

## Unidad II — Navegación

Se implementaron tabs, rutas y lazy loading.

## Unidad III — Componentes de interfaz

Se utilizaron:

- Cards.
- Lists.
- Inputs.
- Buttons.
- Badges.
- Modales.
- Gestos.
- Pull-to-refresh.

## Unidad IV — Conectividad

Se implementó detección de conexión online y offline.

## Unidad V — Bluetooth

Se implementó Bluetooth Low Energy.

## Unidad VI — Geolocalización

Se implementaron:

- GPS.
- Mapa.
- Marcadores.
- Ubicación actual.
- Geocerca.

## Unidad VII — Multimedia

Se implementaron:

- Audio.
- Video.
- Controles multimedia.

## Unidad VIII — Cámara y códigos QR

Se implementaron:

- Cámara.
- Galería.
- Fotografías.
- Eliminación de fotografías.
- Escaneo de códigos QR.

## Unidad IX — Almacenamiento

Se implementó almacenamiento persistente utilizando Ionic Storage.

Se desarrollaron operaciones CRUD para favoritos.

## Unidad X — Servicios web

Se implementó consumo de API REST mediante HttpClient.

Se desarrollaron:

- GET.
- POST.
- Loading.
- Manejo de errores.
- Caché.

---

# Equipo de desarrollo

| Integrante | Matrícula |
|---|---|
| Junior Alexander Sánchez Imbert | 100073711 |
| Leodis Reynaldo Rodríguez Calderón | 100063024 |
| Edmoun Elías Ramírez Pérez | 100065687 |
| Padwel Alexander Pérez | 100031393 |
| Cristopher Díaz Tejada | 100073686 |

---

# Proyecto académico

**Asignatura:** Programación de Dispositivos Móviles

**Código:** ISW-307

**Proyecto:** ExploraRD

**Descripción:** Aplicación móvil turística para descubrir destinos de la República Dominicana.

---

# Repositorio oficial

Repositorio GitHub:

https://github.com/Junior-Sanchez15/ExploraRD.git

Rama principal:

```text
master
```

---

# Estado del proyecto

El proyecto se encuentra en estado funcional.

Actualmente cuenta con:

- Navegación completa.
- Catálogo de destinos.
- Búsqueda.
- Filtros.
- Detalle de destinos.
- Favoritos.
- Persistencia local.
- Mapa interactivo.
- GPS.
- Marcadores.
- Geocerca.
- Conectividad.
- Bluetooth LE.
- Multimedia.
- Cámara.
- Galería.
- Código QR.
- Servicios REST.
- GET.
- POST.
- Caché.
- Manejo de errores.
- Loading.
- Modo oscuro.
- Configuración.
- Proyecto Android.
- Repositorio GitHub.

---

# Permisos utilizados

Dependiendo de la plataforma y funcionalidad utilizada, la aplicación puede requerir permisos relacionados con:

- Ubicación.
- Cámara.
- Bluetooth.
- Dispositivos cercanos.
- Acceso a fotografías o galería.

Estos permisos son utilizados únicamente para las funcionalidades correspondientes de la aplicación.

---

# Recursos del proyecto

## Imágenes

Las imágenes de los destinos se encuentran en:

```text
src/assets/images/
```

## Audio

El archivo de audio se encuentra en:

```text
src/assets/audio/atlas-dominican-republic.mp3
```

## Video

El archivo de video se encuentra en:

```text
src/assets/video/explorard-destino.mp4
```

---

# Control de versiones

El proyecto utiliza Git para el control de versiones.

Repositorio:

```text
https://github.com/Junior-Sanchez15/ExploraRD.git
```

Rama principal:

```text
master
```

Commit principal de la versión final:

```text
Version final de ExploraRD
```

Para consultar el estado del proyecto:

```bash
git status
```

Para consultar los commits:

```bash
git log --oneline
```

Para actualizar el repositorio:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

---

# 🚀 Flujo básico de desarrollo

El flujo utilizado para desarrollar el proyecto fue:

```text
1. Crear proyecto Ionic
        ↓
2. Configurar Angular
        ↓
3. Crear navegación y tabs
        ↓
4. Crear modelos
        ↓
5. Crear servicios
        ↓
6. Crear páginas
        ↓
7. Implementar funcionalidades móviles
        ↓
8. Integrar Capacitor
        ↓
9. Probar en navegador
        ↓
10. Probar en dispositivo Android
        ↓
11. Corregir errores
        ↓
12. Generar build
        ↓
13. Sincronizar Android
        ↓
14. Subir proyecto a GitHub
```

---

# Notas de desarrollo

El proyecto fue desarrollado de manera modular, separando las responsabilidades entre páginas, servicios y modelos.

Los servicios se encargan de administrar funcionalidades específicas como:

- Destinos.
- Favoritos.
- Conectividad.
- Bluetooth.
- Servicios REST.

Las páginas se encargan principalmente de la presentación y la interacción con el usuario.

El proyecto fue probado tanto en navegador como en un dispositivo Android físico.

Para las funcionalidades nativas se utilizó Capacitor.