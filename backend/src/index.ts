import 'reflect-metadata';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import exchangeRoutes from './routes/exchange.routes';
import authRoutes from './routes/auth.routes';

const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const app = express();

// middlewares
// Allow requests from http://localhost:8080
const corsOptions = {
    origin: 'http://localhost:8080',
  };
app.use(cors(corsOptions));
app.use(morgan(env));

// para poder interperetar los datos que vienen al servidor en formato json
app.use(express.json());

// routes

app.use(exchangeRoutes);
app.use(authRoutes);

app.listen(PORT);
console.log('Server on Port', PORT);