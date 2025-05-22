import express from 'express';
import { checkRoomAvailability, createBooking, getHotelBookings, getUserBookings } from '../controllers/bookingController.js';
import protect from '../middleware/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/create', protect, createBooking);
bookingRouter.get('/check-room-availability', checkRoomAvailability);
bookingRouter.get('/user-bookings', protect, getUserBookings);
bookingRouter.get('/hotel-bookings', protect, getHotelBookings);

export default bookingRouter;