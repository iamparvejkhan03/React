import express from 'express';
import cors from 'cors';
import "dotenv/config";
import dbConnect from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRouter.js';

dbConnect();

const app = express();

app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

app.use('/api/clerk', clerkWebhooks);

app.use('/api/user', userRouter);

app.get('/', (req, res) => res.send("API is working smoothly."));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));