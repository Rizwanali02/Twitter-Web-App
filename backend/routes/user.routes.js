import express from 'express';
import { bookmark, getOtherUsers, getMyProfile, login, logout, register, followAndUnFollow } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.put("/bookmark/:id", isAuthenticated, bookmark);
router.get("/profile/:id", isAuthenticated, getMyProfile);
router.get("/all/users", isAuthenticated, getOtherUsers);
router.put("/followandunfollow/:id", isAuthenticated, followAndUnFollow);


export default router