import { ReservationModel } from "../models/reservation.model";
import { Reservation } from "../types/reservation.interface";

export const ReservationService = {
    createReservation: (data: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => {
        return ReservationModel.createReservation(data);
    },

    findById: (id: string): Reservation | undefined => {
        if (!id) {
            throw new Error('ID inválido');
        }
        return ReservationModel.findById(id);
    },

    update: (id: string, updates: Partial<Reservation>): Reservation | undefined => {
        const updated = ReservationModel.update(id, updates);
        if (!updated) {
            throw new Error('No se ha podido actualizar la reserva. Reserva inexistente');
        }
        return updated;
    },

    deleteReservation: (id: string): string | undefined => {
        if (!id) {
            throw new Error('Error al eliminar reserva. ID inválido');
        }
        const res = ReservationModel.deleteReservation(id);
        if (!res) {
            throw new Error('Error al eliminar reserva');
        }
        return res;
    },
};