import { Injectable } from '@angular/core';
import { Lugar } from '../models/lugar.model';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  private lugares: Lugar[] = [

    // PLAYAS // 

    {
      id: 1,
      nombre: 'Bahia de las Águilas',
      ubicacion: 'Pedernales',
      provincia: 'Pedernales',
      categoria: 'Playas',
      rating: 4.9,
      imagen: 'assets/images/bahia-aguilas.jpg',
      descripcion:
        'Una de las playas más impresionantes de Republica Dominicana, reconocida por sus aguas cristalinas, arena blanca y entorno natural protegido.',
      latitud: 17.8738,
      longitud: -71.6457
    },

    {
      id: 2,
      nombre: 'Playa Bavaro',
      ubicacion: 'Punta Cana',
      provincia: 'La Altagracia',
      categoria: 'Playas',
      rating: 4.8,
      imagen: 'assets/images/playa-bavaro.jpg',
      descripcion:
        'Una de las playas más famosas del pais, con arena blanca, aguas turquesas y una gran variedad de actividades turisticas.',
      latitud: 18.6750,
      longitud: -68.4065
    },

    {
      id: 3,
      nombre: 'Playa Rincon',
      ubicacion: 'Las Galeras',
      provincia: 'Samaná',
      categoria: 'Playas',
      rating: 4.9,
      imagen: 'assets/images/playa-rincon.jpg',
      descripcion:
        'Hermosa playa de Samaná rodeada de naturaleza, montañas y aguas cristalinas. Es considerada una de las playas mas bonitas del Caribe.',
      latitud: 19.2575,
      longitud: -69.3078
    },

    {
      id: 4,
      nombre: 'Playa Macao',
      ubicacion: 'Macao',
      provincia: 'La Altagracia',
      categoria: 'Playas',
      rating: 4.7,
      imagen: 'assets/images/playa-macao.jpg',
      descripcion:
        'Playa de arena dorada y aguas azules, muy popular para disfrutar del mar y practicar actividades acuáticas.',
      latitud: 18.8235,
      longitud: -68.5950
    },

    // MONTAÑAS // 

    {
      id: 5,
      nombre: 'Pico Duarte',
      ubicacion: 'Cordillera Central',
      provincia: 'San Juan',
      categoria: 'Montañas',
      rating: 4.9,
      imagen: 'assets/images/pico-duarte.jpg',
      descripcion:
        'El punto más alto de las Antillas. Es uno de los principales destinos de senderismo y aventura de República Dominicana.',
      latitud: 19.0047,
      longitud: -70.9970
    },

    {
      id: 6,
      nombre: 'Valle Nuevo',
      ubicacion: 'Constanza',
      provincia: 'La Vega',
      categoria: 'Montañas',
      rating: 4.8,
      imagen: 'assets/images/valle-nuevo.jpg',
      descripcion:
        'Reserva natural conocida por sus paisajes montañosos, clima fresco, bosques de pinos y ecosistemas únicos.',
      latitud: 18.8047,
      longitud: -70.6469
    },

    // NATURALEZA // 

    {
      id: 7,
      nombre: 'Jarabacoa',
      ubicacion: 'Jarabacoa',
      provincia: 'La Vega',
      categoria: 'Naturaleza',
      rating: 4.8,
      imagen: 'assets/images/jarabacoa.jpg',
      descripcion:
        'Destino de montaña conocido por sus ríos, cascadas, paisajes naturales y actividades de aventura.',
      latitud: 19.1218,
      longitud: -70.6350
    },

    {
      id: 8,
      nombre: '27 Charcos de Damajagua',
      ubicacion: 'Imbert',
      provincia: 'Puerto Plata',
      categoria: 'Naturaleza',
      rating: 4.9,
      imagen: 'assets/images/damajagua.jpg',
      descripcion:
        'Complejo natural formado por cascadas y piscinas naturales donde los visitantes pueden disfrutar de una experiencia llena de aventura.',
      latitud: 19.7597,
      longitud: -70.8319
    },

    {
      id: 9,
      nombre: 'Los Haitises',
      ubicacion: 'Sabana de la Mar',
      provincia: 'Samaná',
      categoria: 'Naturaleza',
      rating: 4.8,
      imagen: 'assets/images/los-haitises.jpg',
      descripcion:
        'Parque nacional caracterizado por manglares, cuevas, formaciones rocosas y una gran diversidad de flora y fauna.',
      latitud: 19.0667,
      longitud: -69.4500
    },

    {
      id: 13,
      nombre: 'Samaná',
      ubicacion: 'Santa Bárbara de Samaná',
      provincia: 'Samaná',
      categoria: 'Naturaleza',
      rating: 4.8,
      imagen: 'assets/images/samana.jpg',
      descripcion:
        'Destino turístico rodeado de naturaleza, playas, montañas y paisajes espectaculares de la bahía de Samaná.',
      latitud: 19.2056,
      longitud: -69.3369
    },

    // CULTURA // 

    {
      id: 10,
      nombre: 'Zona Colonial',
      ubicacion: 'Santo Domingo',
      provincia: 'Santo Domingo',
      categoria: 'Cultura',
      rating: 4.9,
      imagen: 'assets/images/zona-colonial.jpg',
      descripcion:
        'Centro histórico de Santo Domingo, famoso por sus calles coloniales, monumentos, plazas y edificios históricos.',
      latitud: 18.4764,
      longitud: -69.8840
    },

    {
      id: 11,
      nombre: 'Altos de Chavón',
      ubicacion: 'La Romana',
      provincia: 'La Romana',
      categoria: 'Cultura',
      rating: 4.8,
      imagen: 'assets/images/altos-chavon.jpg',
      descripcion:
        'Pueblo artístico de estilo mediterráneo construido sobre el río Chavón, con galerías, restaurantes y espacios culturales.',
      latitud: 18.4230,
      longitud: -68.8610
    },

    {
      id: 12,
      nombre: 'Basílica de Higüey',
      ubicacion: 'Higüey',
      provincia: 'La Altagracia',
      categoria: 'Cultura',
      rating: 4.8,
      imagen: 'assets/images/basilica-higuey.jpg',
      descripcion:
        'Importante monumento religioso y cultural de República Dominicana, dedicado a Nuestra Señora de la Altagracia.',
      latitud: 18.6150,
      longitud: -68.7070
    },

    {
      id: 14,
      nombre: 'Punta Cana',
      ubicacion: 'Punta Cana',
      provincia: 'La Altagracia',
      categoria: 'Playas',
      rating: 4.8,
      imagen: 'assets/images/punta-cana.jpg',
      descripcion:
        'Uno de los destinos turísticos más conocidos del Caribe, famoso por sus playas, resorts y actividades acuáticas.',
      latitud: 18.5601,
      longitud: -68.3725
    },

    {
      id: 15,
      nombre: 'Puerto Plata',
      ubicacion: 'Puerto Plata',
      provincia: 'Puerto Plata',
      categoria: 'Cultura',
      rating: 4.7,
      imagen: 'assets/images/puerto-plata.jpg',
      descripcion:
        'Ciudad turística de la costa norte conocida por su historia, arquitectura, teleférico y hermosos paisajes.',
      latitud: 19.7934,
      longitud: -70.6884
    },

    // GASTRONOMÍA // 

    {
      id: 16,
      nombre: 'Adrian Tropical',
      ubicacion: 'Santo Domingo',
      provincia: 'Santo Domingo',
      categoria: 'Gastronomía',
      rating: 4.3,
      imagen: 'assets/images/adrian-tropical.jpg',
      descripcion:
        'Restaurante de comida dominicana y caribeña conocido por ofrecer platos criollos y una experiencia gastronómica tradicional.',
      latitud: 18.455174,
      longitud: -69.954234
    },

    {
      id: 17,
      nombre: 'El Conuco',
      ubicacion: 'Santo Domingo',
      provincia: 'Santo Domingo',
      categoria: 'Gastronomía',
      rating: 4.4,
      imagen: 'assets/images/el-conuco.jpg',
      descripcion:
        'Restaurante especializado en comida dominicana tradicional, con una propuesta inspirada en los sabores y costumbres del campo dominicano.',
      latitud: 18.4625,
      longitud: -69.9205
    },

    {
      id: 18,
      nombre: 'Mesón de Bari',
      ubicacion: 'Ciudad Colonial',
      provincia: 'Santo Domingo',
      categoria: 'Gastronomía',
      rating: 4.3,
      imagen: 'assets/images/meson-bari.jpg',
      descripcion:
        'Restaurante tradicional de la Ciudad Colonial donde se pueden disfrutar diferentes platos representativos de la gastronomía dominicana.',
      latitud: 18.4736,
      longitud: -69.8848
    },

    {
      id: 19,
      nombre: 'Jalao',
      ubicacion: 'Ciudad Colonial',
      provincia: 'Santo Domingo',
      categoria: 'Gastronomía',
      rating: 4.5,
      imagen: 'assets/images/jalao.jpg',
      descripcion:
        'Restaurante ubicado en la Ciudad Colonial que combina gastronomía dominicana, música y elementos de la cultura local.',
      latitud: 18.4730,
      longitud: -69.8845
    },

    {
      id: 20,
      nombre: 'Villar Hermanos',
      ubicacion: 'Santo Domingo',
      provincia: 'Santo Domingo',
      categoria: 'Gastronomía',
      rating: 4.4,
      imagen: 'assets/images/villar-hermanos.jpg',
      descripcion:
        'Restaurante y panadería tradicional de Santo Domingo conocido por su variedad de comida dominicana y productos de panadería.',
      latitud: 18.4617,
      longitud: -69.9065
    }
  ];

  obtenerLugares(): Lugar[] {
    return [...this.lugares];
  }

  obtenerLugarPorId(id: number): Lugar | undefined {
    return this.lugares.find(lugar => lugar.id === id);
  }

  obtenerLugaresPorCategoria(categoria: string): Lugar[] {
    return this.lugares.filter(
      lugar => lugar.categoria === categoria
    );
  }
}