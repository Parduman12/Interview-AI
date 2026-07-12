import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());


import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);
export default app