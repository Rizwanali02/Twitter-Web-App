import express from 'express';
import { createTweet, deleteTweet, getAllTweets, getBookMarkTweet, getFollowingAllTweets, getMyTweets, likeOrDislike, toggleBookMark } from '../controllers/tweet.controller.js';
import { isAuthenticated } from "../middleware/auth.middleware.js"
const router = express.Router();

router.post("/create", isAuthenticated, createTweet);
router.delete("/delete/:id", isAuthenticated, deleteTweet);
router.put("/like/:id", isAuthenticated, likeOrDislike);
router.get("/tweets/:id", isAuthenticated, getMyTweets);
router.get("/allusertweets/:id", isAuthenticated, getAllTweets);
router.get("/followingUsertweets/:id", getFollowingAllTweets);
router.put("/toggle-bookmark/:tweetId",isAuthenticated ,toggleBookMark);
router.get("/bookmark-tweet",isAuthenticated ,getBookMarkTweet);



export default router