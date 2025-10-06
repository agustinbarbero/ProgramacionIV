import request from 'supertest';
import { makeApp } from '../../src/app';
import { ReservationModel } from '../../src/models/reservation.model';

const app = makeApp();

describe('Reservation API Integration Tests', () => {

    beforeEach(() => {
        ReservationModel.clearAll();
    });

    const reservationData = {
        customerName: 'Integration Test',
        customerEmail: 'integration@test.com',
        reservationDate: '2028-10-10',
        reservationTime: '18:00',
        partySize: 4
    };

    it('POST /api/reservations - Deberia crear una reserva', async () => {
        const response = await request(app)
            .post('/api/reservations')
            .send(reservationData);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.reservation.id).toBeDefined();
        expect(response.body.reservation.customerName).toBe(reservationData.customerName);
    });

    it('POST /api/reservations - Deberia fallar con datos invalidos', async () => {
        const invalidData = { ...reservationData, customerEmail: 'invalid-email' };
        const response = await request(app)
            .post('/api/reservations')
            .send(invalidData);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('GET /api/reservations/:id - Deberia obtener una reserva por ID', async () => {
        const createResponse = await request(app)
            .post('/api/reservations')
            .send(reservationData);

        const reservationId = createResponse.body.reservation.id;

        const response = await request(app).get(`/api/reservations/${reservationId}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(reservationId);
        expect(response.body.customerName).toBe(reservationData.customerName);
    });

    it('GET /api/reservations/:id - Deberia devolver 404 si no se encuentra', async () => {
        const response = await request(app).get('/api/reservations/999');
        expect(response.status).toBe(404);
    });

    it('PUT /api/reservations/:id - Deberia actualizar una reserva', async () => {
        const createResponse = await request(app)
            .post('/api/reservations')
            .send(reservationData);

        const reservationId = createResponse.body.reservation.id;
        const updateData = { ...reservationData, partySize: 6 };

        const response = await request(app)
            .put(`/api/reservations/${reservationId}`)
            .send(updateData);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.updated.partySize).toBe(6);

        // Verificar que se actualizó
        const getResponse = await request(app).get(`/api/reservations/${reservationId}`);
        expect(getResponse.body.partySize).toBe(6);
    });

    it('DELETE /api/reservations/:id - Deberia eliminar una reserva', async () => {
        const createResponse = await request(app)
            .post('/api/reservations')
            .send(reservationData);

        const reservationId = createResponse.body.reservation.id;

        const deleteResponse = await request(app).delete(`/api/reservations/${reservationId}`);
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body.success).toBe(true);

        // Verificar que fue eliminada
        const getResponse = await request(app).get(`/api/reservations/${reservationId}`);
        expect(getResponse.status).toBe(404);
    });
});