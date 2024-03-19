import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model.js';
import jwt from "jsonwebtoken"
const register = async (req, res) => {

    try {
        const { name, username, email, password } = req.body;
        // basic validation
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exist.",
                success: false
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 10);

        let newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            user: newUser
        })

    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false, message: "User does not exist"
            });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
        return res.status(201).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
            message: `Login Successfully`,
            success: true,
            user,
            token
        })

    } catch (error) {
        console.log(`error in login: ${error}`);

    }
};

const logout = (req, res) => {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "user logged out successfully.",
        success: true
    })
}


const bookmark = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const tweetId = req.params.id;
        const user = await User.findById(loggedInUserId);
        if (user.bookmarks.includes(tweetId)) {
            // remove
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } });
            return res.status(200).json({
                success: true,
                message: "Removed from bookmarks."
            });
        } else {
            // bookmark
            await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } });
            return res.status(200).json({
                success: true,
                message: "Saved to bookmarks."
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const getMyProfile = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({
            success: true,
            message: "User Profile",
            user
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getOtherUsers = async (req, res) => {
    try {
        const id = req.user._id;
        const allUsers = await User.find({ _id: { $ne: id } }).select("-password");
        if (allUsers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "All Users",
            allUsers
        })
    } catch (error) {
        console.log(error);
    }

}

const followAndUnFollow = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // user follow/unfollow krne wala
        const userId = req.params.id; // user jise followed/unfollowed krna hai

        
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        // Check if the user being followed/unfollowed exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if the logged in user is already following the user
        const isFollowing = user.followers.includes(loggedInUserId);

        if (!isFollowing) {
            // If not following, follow the user
            await user.updateOne({ $push: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $push: { following: userId } });

            return res.status(200).json({
                success: true,
                message: `${loggedInUser.name} follow ${user.name}`
            });
        } else {
            // If already following, unfollow the user
            await user.updateOne({ $pull: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $pull: { following: userId } });

            return res.status(200).json({
                success: true,
                message: `${loggedInUser.name} unfollow ${user.name}`
            });
        }
    } catch (error) {
        console.error(`Error in follow/unfollow: ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
export {
    register,
    login,
    logout,
    bookmark,
    getMyProfile,
    getOtherUsers,
    followAndUnFollow
} 