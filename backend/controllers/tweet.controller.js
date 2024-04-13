import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";

const createTweet = async (req, res) => {
    try {
        const { description } = req.body;
        const id = req.user._id;

        console.log(description);

        if (!description) {
            return res.status(401).json({
                success: false,
                message: "Fill all fields"
            });
        }

        const user = await User.findById(id).select("-password")
        const newTweet = await Tweet.create({
            description,
            userId: id,
            userDetails: user
        });

        return res.status(201).json({
            success: true,
            message: "Tweet created successfully",
            tweet: newTweet

        });
    } catch (error) {
        console.log(`error in tweet creation ${error}`);
    }

}

const deleteTweet = async (req, res) => {

    try {
        const { id } = req.params;
        const deleteTweet = await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Tweet deleted successfully",
            tweet: deleteTweet
        });

    } catch (error) {
        console.log(error);
    }
}


const likeOrDislike = async (req, res) => {
    try {
        //get loggeg in user
        const loggedInUserId = req.user._id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);


        if (tweet.like.includes(loggedInUserId)) {
            // dislike
            await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: loggedInUserId } });
            return res.status(200).json({
                success: true,
                message: "Disliked tweet."
            })
        } else {
            // like
            await Tweet.findByIdAndUpdate(tweetId, { $push: { like: loggedInUserId } });
            return res.status(200).json({
                success: true,
                message: "Liked tweet."
            })
        }
    } catch (error) {
        console.log(error);
    }
};

const getMyTweets = async (req, res) => {
    try {
        const tweetCreateUserId = req.user._id;
        console.log(tweetCreateUserId);
        const myTweets = await Tweet.find({ userId: tweetCreateUserId });
        res.status(200).json({
            success: true,
            message: "User All Tweets",
            myTweets
        })
    } catch (error) {
        console.log(error);
    }

};

const getAllTweets = async (req, res) => {
    try {
        // logged-in user's ID
        const { loggedInUserId } = req.params;

        // OtherUsers 
        const otherUsersId = await User.find({ _id: { $ne: loggedInUserId } });

        const otherUsersTweets = await Tweet.find({ userId: otherUsersId })

        res.status(200).json({
            success: true,
            message: "Tweets from other users",
            tweets: otherUsersTweets
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



const getFollowingAllTweets = async (req, res) => {
    try {
        const { id } = req.params;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({ userId: id });
        const followingUserTweets = await Promise.all(loggedInUser.following?.map((otherUserId) => {
            return Tweet.find({ userId: otherUserId });
        }));

        const allTweets = [...loggedInUserTweets, ...followingUserTweets.flat()]; // Flatten the array of arrays

        return res.status(200).json({
            success: true,
            message: "All Tweets",
            tweets: allTweets
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};






export {
    createTweet,
    deleteTweet,
    likeOrDislike,
    getMyTweets,
    getAllTweets,
    getFollowingAllTweets

}