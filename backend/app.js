import express from 'express';
import dotenv from "dotenv"
import dbConnection from './database/db.database.js';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/user.routes.js"
import userTweet from "./routes/tweet.routes.js"
import cors from 'cors';
import messageRoute from './routes/message.routes.js';

dotenv.config();
dbConnection()
const app = express();
app.use(cors({
    origin: ['http://localhost:5173','https://twitter-web-app-eight.vercel.app'],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes--------------------------------
app.use("/api/v3/user", userRoute);
app.use("/api/v3/tweet", userTweet);
app.use("/api/v3/message", messageRoute);

app.get('/', (req, res) => {
    res.send('Backend Development');
});


export default app;