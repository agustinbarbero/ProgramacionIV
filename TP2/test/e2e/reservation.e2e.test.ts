import request from 'supertest';
import { makeApp } from '../../src/app';
import http from 'http';
import { ReservationModel } from '../../src/models/reservation.model';

let server: http.Server;

beforeAll((done) => {
    const app = makeApp();
    server = app.listen(0, () => { 
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

beforeEach(() => {
    ReservationModel.clearAll();
});


describe('Reservation API E2E Tests', () => {
    const reservationData = {
        customerName: 'E2E Test',
        customerEmail: 'e2e@test.com',
        reservationDate: '2029-11-11',
        reservationTime: '20:00',
        partySize: 2
    };

    it('Deberia realizar el flujo completo: Crear, Obtener, Actualizar y Eliminar una reserva', async () => {
        const createResponse = await request(server)
            .post('/api/reservations')
            .send(reservationData);

        expect(createResponse.status).toBe(201);
        const reservationId = createResponse.body.reservation.id;
        expect(reservationId).toBeDefined();

        const getResponse = await request(server).get(`/api/reservations/${reservationId}`);
        expect(getResponse.status).toBe(200);
        expect(getResponse.body.customerName).toBe(reservationData.customerName);

        const updateData = { ...reservationData, partySize: 3 };
        const updateResponse = await request(server).put(`/api/reservations/${reservationId}`).send(updateData);
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.updated.partySize).toBe(3);

        const deleteResponse = await request(server).delete(`/api/reservations/${reservationId}`);
        expect(deleteResponse.status).toBe(200);
    });
});