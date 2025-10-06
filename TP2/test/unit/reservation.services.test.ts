import { ReservationModel } from '../../src/models/reservation.model';
import { ReservationService } from '../../src/services/reservation.services';

describe('ReservationService', () => {
    beforeEach(() => {
        ReservationModel.clearAll();
    });

    it('Deberia crear una reserva exitosamente', () => {
        const res = ReservationService.createReservation({
            customerName: 'Luciano',
            customerEmail: 'luciano@gmail.com',
            reservationDate: '2025-09-26',
            reservationTime: '10:00',
            partySize: 2
        });
        expect(res.customerName).toBe('Luciano');
        expect(res.status).toBe('pending');
        expect(res.id).toBeDefined();
    });

    it('Deberia devolver una reserva segun el ID', () => {
        const res = ReservationService.createReservation({
            customerName: 'Luciano',
            customerEmail: 'luciano@gmail.com',
            reservationDate: '2025-09-26',
            reservationTime: '10:00',
            partySize: 2
        });
        const foundById = ReservationService.findById(res.id);
        expect(foundById).toEqual(res);
    });

    it('Deberia devolver undefined al buscar una reserva con ID invalido', () => {
        const falseId = '999';
        const foundById = ReservationService.findById(falseId);
        expect(foundById).toBeUndefined();
    });

    it('Deberia actualizar una reserva exitosamente', () => {
        const res = ReservationService.createReservation({
            customerName: 'Luciano',
            customerEmail: 'luciano@gmail.com',
            reservationDate: '2025-09-26',
            reservationTime: '10:00',
            partySize: 2
        })
        const updated = ReservationService.update(res.id, { partySize: 8 });
        expect(updated?.partySize).toBe(8);
    });

    it('Deberia lanzar error al intentar actualizar una reserva inexistente', () => {
        expect(() => ReservationService.update('999', { partySize: 5 }))
            .toThrow('No se ha podido actualizar la reserva. Reserva inexistente');
    });

    it('Deberia eliminar una reserva exitosamente', () => {
        const res = ReservationService.createReservation({
            customerName: 'Luciano',
            customerEmail: 'luciano@gmail.com',
            reservationDate: '2025-09-26',
            reservationTime: '10:00',
            partySize: 2
        });
        const eliminated = ReservationService.deleteReservation(res.id);
        expect(eliminated).toBeDefined();
    });

    it('Deberia lanzar error al intentar eliminar reserva con id vacío', () => {
        expect(() => {
            ReservationService.deleteReservation('')
        }).toThrow('Error al eliminar reserva. ID inválido');
    });

    it('Deberia lanzar error al intentar eliminar reserva con id inexistente', () => {
        expect(() => {
            ReservationService.deleteReservation('999')
        }).toThrow('Error al eliminar reserva');
    });



})