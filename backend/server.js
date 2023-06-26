import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/corsOptions.js';
import { connectDB } from './config/dbConn.js';
import 'dotenv/config';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import protectAPI from './middleware/authMiddleware.js';

const app = express();

// middlewares
app.use(cors(corsOptions));
app.use(express.json());

// connect database
connectDB();

// routes

app.use('/api/auth', authRouter);
app.use('/api/user', protectAPI, userRouter);

app.get('/', (req, res) => {
  res.json({ message: 'welcome to the backend' });
});

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`server running at ${PORT}`);
});
