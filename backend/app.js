import express from 'express';
import dotenv from "dotenv"
import dbConnection from './database/db.database.js';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/user.routes.js"
import userTweet from "./routes/tweet.routes.js"

dotenv.config();
dbConnection()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes--------------------------------
app.use("/api/v3/user", userRoute);
app.use("/api/v3/tweet", userTweet);

app.get('/', (req, res) => {
    res.send('Backend Development');
});


export default app;