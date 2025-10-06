import { Request, Response } from "express";
import { ReservationService } from "../services/reservation.services";
import { reservationSchema } from "../validations/reservation.schema";
import { ZodError } from "zod";

export const ReservationController = {
    createReservation: async (req: Request, res: Response) => {
        try {
            const parsed = reservationSchema.parse(req.body);
            const reservation = await ReservationService.createReservation(parsed);
            return res.status(201).json({
                success: true,
                message: 'Reserva creada exitosamente',
                reservation
            });
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    error: error.issues
                });
            }
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    findById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Error. ID invalido' });
            }
            const reservation = await ReservationService.findById(id);
            if (!reservation) {
                return res.status(404).json({ message: 'Error. Reserva no encontrada' });
            }
            return res.status(200).json(reservation);
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Error. ID invalido' });
            }
            const parsed = await reservationSchema.parse(req.body);
            const updated = await ReservationService.update(id, parsed);
            return res.status(200).json({
                success: true,
                message: 'Reserva actualizada exitosamente',
                updated
            });
        } catch (error: any) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    error: error.issues
                });
            }
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    deleteReservation: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Error. ID invalido' });
            }
            const eliminated = await ReservationService.deleteReservation(id);
            return res.status(200).json({
                success: true,
                message: 'Reserva eliminado exitosamente',
                eliminated
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }


}
 
