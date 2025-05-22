import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { getMessage, sendMessage } from '../controllers/message.controller.js';


const messageRoute=express.Router();

messageRoute.route("/send/:id").post(isAuthenticated,sendMessage);
messageRoute.route("/:id").get(isAuthenticated, getMessage);

export default messageRoute

