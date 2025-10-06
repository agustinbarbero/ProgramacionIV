import express from 'express';
import reservationRoutes from './routes/reservation.routes';

export function makeApp(){
    const app = express();
    app.use(express.json());

    //rutas
    app.use('/api/reservations', reservationRoutes);

    return app;
}
