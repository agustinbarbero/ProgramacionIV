import { Reservation } from "../types/reservation.interface";

const reservations: Map<string, Reservation> = new Map();
let idCounter = 1;

export const ReservationModel = {
    //crear una nueva reserva
    createReservation: (reservationData: Omit<Reservation, 'id' | 'status' | 'createdAt'>): Reservation => {
        const id = (idCounter++).toString();
        const newReservation: Reservation = {
            ...reservationData,
            id,
            status: 'pending',
            createdAt: new Date()
        };
        reservations.set(id, newReservation);
        return newReservation
    },


    findById: (id: string): Reservation | undefined => {
        return reservations.get(id);
    },

    update: (id: string, updates: Partial<Reservation>): Reservation | undefined => {
        const existing = reservations.get(id);
        if (!existing) return undefined;

        const updated = { ...existing, ...updates };
        reservations.set(id, updated);
        return updated;
    },

    deleteReservation: (id: string): string | undefined => {
        const existing = reservations.get(id);
        if (!existing) return undefined

        reservations.delete(id);
        return `Reserva ${id} borrada exitosamente`;
    },

    clearAll: () => {
        reservations.clear();
        idCounter = 1;
    }
}




