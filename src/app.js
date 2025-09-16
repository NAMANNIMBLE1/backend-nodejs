import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGINS || '*',
    credentials: true,
}));

// Middlewares
app.use(express.json()); // parse JSON request body
app.use(express.static('public')); // ✅ fixed `.user` -> `.use`
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // parse urlencoded body
app.use(cookieParser()); // parse cookies

// Routes
import router from './routes/user.routes.js';

app.use("/api/v1/users", router);

export { app , PORT};
