import express from 'express';
import cors from 'cors';
import "dotenv/config";
import dbConnect from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import cloudinaryConfiguration from './config/cloudinary.js';
import bookingRouter from './routes/bookingRoutes.js';

dbConnect();
cloudinaryConfiguration();

const app = express();

app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

app.use('/api/clerk', clerkWebhooks);

app.use('/api/user', userRouter);

app.use('/api/hotels', hotelRouter);

app.use('/api/rooms', roomRouter);

app.use('/api/bookings', bookingRouter);

app.get('/', (req, res) => res.send("API is working smoothly."));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));