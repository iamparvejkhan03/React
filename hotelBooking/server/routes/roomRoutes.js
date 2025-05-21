import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { getRooms, getHotelRooms, toggleRoomAvailability, createRoom } from '../controllers/roomController.js';
import upload from '../middleware/uploadMiddleware.js';

const roomRouter = express.Router();

roomRouter.get('/all', getRooms);
roomRouter.get('/hotel', getHotelRooms);
roomRouter.post('/availability', protect, toggleRoomAvailability);
roomRouter.post('/create', upload.array("images", 4),  protect, createRoom);

export default roomRouter;