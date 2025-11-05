import { rest } from 'msw';
import { menuData } from './menuData';

// Definimos los manejadores de las peticiones que queremos interceptar
export const handlers = [
  // Intercepta peticiones GET a '/api/menu'
  rest.get('http://localhost/api/menu', (req, res, ctx) => {
    return res(
      ctx.status(200), 
      ctx.json(menuData),
      ctx.delay(150) // Simula un pequeño retardo de red (opcional, para realismo)
    );
  }),

  rest.post('http://localhost/api/orders', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true, message: 'Pedido confirmado' })
    );
  }),

];