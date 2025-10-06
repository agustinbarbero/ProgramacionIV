import { Router } from 'express';
import { ReservationController } from '../controllers/reservation.controller';

const router = Router();

router.post('/', ReservationController.createReservation);
router.get('/:id', ReservationController.findById);
router.put('/:id', ReservationController.update);
router.delete('/:id', ReservationController.deleteReservation);

export default router;
