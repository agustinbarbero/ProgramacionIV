import { z } from 'zod';

export const reservationSchema = z.object({
    customerName: z.string().min(2),
    customerEmail: z.string().email(),
    partySize: z.number().min(1).max(12),
    reservationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    reservationTime: z.string().regex(/^\d{2}:\d{2}$/),
});
