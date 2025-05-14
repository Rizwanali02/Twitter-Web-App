import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
    try {
        // get token from cookies
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        // console.log("token",token);
        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        // Find user in database based on token
        const user = await User.findById(decoded.userId);

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // Attach user to request object
        req.user = user;

        next();
    } catch (error) {
        console.error(`Token verification failed: ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error -- Token verification failed"
        });
    }
};

export { isAuthenticated };
