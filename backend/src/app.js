import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.CLIENT_URL
].filter(Boolean).map(url => url.trim().replace(/\/$/, ""));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const normalizedOrigin = origin.trim().replace(/\/$/, "");
        if (allowedOrigins.includes(normalizedOrigin)) {
            callback(null, true);
        } else {
            console.warn(`[CORS Blocked] Origin "${origin}" is not in allowed list:`, allowedOrigins);
            callback(new Error('Blocked by CORS policy'));
        }
    },
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());


import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);
export default app