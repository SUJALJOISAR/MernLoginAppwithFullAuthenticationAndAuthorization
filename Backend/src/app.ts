import express from 'express';
import morgan from 'morgan';
import {config} from 'dotenv'; // to use the .env file variables and functions we have to import this 
config(); //then simply run the config() to use 
import cookieParser from 'cookie-parser';
import appRouter from './routes/index';
import cors from 'cors';

const app=express();

//middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));// to directly set the cookies from backend to frontend
app.use(express.json());
app.use(morgan("dev"));

  
//for routes
app.use("/api",appRouter);

export default app;

//start the server using "npm run dev"