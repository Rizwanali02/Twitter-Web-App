import express from 'express';
import { createTweet, deleteTweet, getAllTweets, getFollowingAllTweets, getMyTweets, likeOrDislike } from '../controllers/tweet.controller.js';
import { isAuthenticated } from "../middleware/auth.middleware.js"
const router = express.Router();

router.post("/create", isAuthenticated, createTweet);
router.delete("/delete/:id", isAuthenticated, deleteTweet);
router.put("/like/:id", isAuthenticated, likeOrDislike);
router.get("/tweets", isAuthenticated, getMyTweets);
router.get("/allusertweets", isAuthenticated, getAllTweets);
router.get("/followingUsertweets", isAuthenticated, getFollowingAllTweets);



export default router