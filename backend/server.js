import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/corsOptions.js';
import { connectDB } from './config/dbConn.js';
import signUpRouter from './routes/signUpRoutes.js';
import 'dotenv/config';

const app = express();

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// connect database
connectDB();

// routes

app.use('/api/signup', signUpRouter);

app.get('/', (req, res) => {
  res.json({ message: 'welcome to the backend' });
});

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`server running at ${PORT}`);
});
