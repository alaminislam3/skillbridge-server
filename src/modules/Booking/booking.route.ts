import express from 'express';
import { BookingController } from './booking.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.get("/all", auth(UserRole.admin), BookingController.getAllBooking)

router.get("/all/:id", auth(UserRole.student),BookingController.getSingleBooking)

router.post("/", auth(UserRole.student),BookingController.createBooking)

router.patch("/:id", auth(UserRole.tutor, UserRole.student), BookingController.updateBookingStatus)

export const BookingRoutes = router;
