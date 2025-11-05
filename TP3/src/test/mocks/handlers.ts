import { rest } from 'msw';

// Definimos los manejadores de las peticiones que queremos interceptar
export const handlers = [
  // Intercepta peticiones GET a '/api/tasks'
  rest.get('http://localhost/api/menu', (req, res, ctx) => {
    // req: contiene información sobre la petición entrante
    // res: función para construir la respuesta mockeada
    // ctx: utilidades para la respuesta (status, json, delay, etc.)
    return res(
      ctx.status(200), // Estado HTTP 200 (OK)
      ctx.json([ // Cuerpo de la respuesta en formato JSON
        { id: 1, titulo: 'Mocca', precio: 2000, imagen: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nespresso.com%2Frecipes%2Fco%2Fes%2F085MOC-mocca-latte.html&psig=AOvVaw1ZhnlCOXwG_LcVq_DyiHtC&ust=1762454157330000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNC0lsHT25ADFQAAAAAdAAAAABAE' },

      ]),
      ctx.delay(150) // Simula un pequeño retardo de red (opcional, para realismo)
    );
  }),

];