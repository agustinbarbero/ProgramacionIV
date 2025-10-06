import { ReservationController } from '../../src/controllers/reservation.controller';
import { ReservationService } from '../../src/services/reservation.services';

jest.mock('../../src/services/reservation.services');

describe('ReservationController', () => {
    it('Deberia crear una reserva exitosamente', async () => {
        const req: any = {
            body: {
                customerName: 'Luciano',
                customerEmail: 'luciano@gmail.com',
                reservationDate: '2025-09-26',
                reservationTime: '10:00',
                partySize: 2
            }
        };

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        (ReservationService.createReservation as jest.Mock).mockResolvedValue({
            id: '123',
            ...req.body
        });

        await ReservationController.createReservation(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Reserva creada exitosamente',
            reservation: {
                id: '123',
                ...req.body
            }
        });
    });

    it('Deberia manejar los errores al crear una reserva', async () => {
        const req: any = {
            body: {
                customerName: 'Luciano',
                customerEmail: 'luciano@gmail.com',
                reservationDate: '2025-09-26',
                reservationTime: '10:00',
                partySize: 2
            }
        };

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        (ReservationService.createReservation as jest.Mock).mockRejectedValue(new Error('Error al crear la reserva'));

        await ReservationController.createReservation(req, res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: 'Error al crear la reserva'
        });
    });


    it('Deberia devolver una reserva si existe', async () => {
        const req: any = { params: { id: '123' } };
        const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        (ReservationService.findById as jest.Mock).mockResolvedValue({
            id: '123',
            customerName: 'Luciano'
        });

        await ReservationController.findById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: '123',
            customerName: 'Luciano'
        });
    });

    it('Deberia devolver 404 si la reserva no existe', async () => {
        const req: any = { params: { id: '123' } };
        const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        (ReservationService.findById as jest.Mock).mockResolvedValue(null);

        await ReservationController.findById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error. Reserva no encontrada' });
    });

    it('Deberia manejar errores en findById', async () => {
        const req: any = { params: { id: '123' } };
        const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        (ReservationService.findById as jest.Mock).mockRejectedValue(new Error('Fallo DB'));

        await ReservationController.findById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Fallo DB' });
    });


    it('Deberia actualizar una reserva exitosamente', async () => {
        const req: any = {
            params: { id: '123' },
            body: {
                customerName: 'Luciano',
                customerEmail: 'luciano@gmail.com',
                reservationDate: '2025-09-27',
                reservationTime: '11:00',
                partySize: 3
            }
        };
        const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        (ReservationService.update as jest.Mock).mockResolvedValue({
            id: '123',
            ...req.body
        });

        await ReservationController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Reserva actualizada exitosamente',
            updated: { id: '123', ...req.body }
        });
    });

    it('Deberia manejar errores al actualizar', async () => {
        const req: any = {
            params: { id: '123' }, body: {
                customerName: 'Luciano',
                customerEmail: 'luciano@gmail.com',
                reservationDate: '2025-09-27',
                reservationTime: '11:00',
                partySize: 3
            }
        };
        const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        (ReservationService.update as jest.Mock).mockRejectedValue(new Error('Error al actualizar'));

        await ReservationController.update(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: 'Error al actualizar'
        });
    });


    it('Deberia eliminar una reserva exitosamente', async () => {
        const req: any = { params: { id: '123' } };
        const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        (ReservationService.deleteReservation as jest.Mock).mockResolvedValue(true);

        await ReservationController.deleteReservation(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Reserva eliminado exitosamente',
            eliminated: true
        });
    });

    it('Deberia manejar errores al eliminar reserva', async () => {
        const req: any = { params: { id: '123' } };
        const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        (ReservationService.deleteReservation as jest.Mock).mockRejectedValue(new Error('Error al eliminar'));

        await ReservationController.deleteReservation(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: 'Error al eliminar'
        });
    });
});
