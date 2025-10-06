import { ReservationModel } from '../../src/models/reservation.model';

describe("ReservationModel", () => {
    beforeEach(() => {
        ReservationModel.clearAll();
    });

    it('Deberia crear una reserva con el status en pendiente', () => {
        const res = ReservationModel.createReservation({
            customerName: 'Luciano',
            customerEmail: 'luciano@gmail.com',
            reservationDate: '2025-09-26',
            reservationTime: '10:00',
            partySize: 2
        });
        expect(res.id).toBeDefined();
        expect(res.status).toBe('pending');
        expect(res.createdAt).toBeInstanceOf(Date);
    });

    it('Deberia devolver una reserva por ID', () => {
        const res = ReservationModel.createReservation({
            customerName: 'Felipe',
            customerEmail: 'felipe@gmail.com',
            reservationDate: '2025-09-26',
            reservationTime: '12:00',
            partySize: 4
        });
        const found = ReservationModel.findById(res.id);
        expect(found).toEqual(res);
    });

    it('Deberia devolver undefined por ID invalido', () => {
        const found = ReservationModel.findById('999');
        expect(found).toBeUndefined();
    });

    it('Deberia actualizar una reserva existente', () => {
        const res = ReservationModel.createReservation({
            customerName: 'Agustin',
            customerEmail: 'agustin@gmail.com',
            reservationDate: '2025-09-26',
            reservationTime: '15:00',
            partySize: 3
        });
        const updated = ReservationModel.update(res.id, { partySize: 6 });
        expect(updated?.partySize).toBe(6);
    });

    it('Deberia devolver undefined al intentar actualizar un ID inexistente', () => {
        const updated = ReservationModel.update('999', { reservationTime: '16:00' });
        expect(updated).toBeUndefined();
    });

    it('Deberia borrar una reserva exitosamente', () => {
        const res = ReservationModel.createReservation({
            customerName: 'Matias',
            customerEmail: 'matias@gmail.com',
            reservationDate: '2025-04-12',
            reservationTime: '23:00',
            partySize: 2
        });
        const eliminated = ReservationModel.deleteReservation(res.id);
        expect(eliminated).toBe(`Reserva ${res.id} borrada exitosamente`);
    });

    it('Deberia devolver undefined al intentar borrar un ID inexistente', () => {
        const eliminated = ReservationModel.deleteReservation('999');
        expect(eliminated).toBeUndefined();
    });
});
