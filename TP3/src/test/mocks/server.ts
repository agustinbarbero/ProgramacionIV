import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Configura el servidor de MSW con nuestros manejadores definidos
export const server = setupServer(...handlers);