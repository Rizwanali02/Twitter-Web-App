import mongoose from "mongoose";

const tweetShema = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },
    like: {
        type: Array,
        default: []
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userDetails: {
        type: Array,
        default: []
    },
    isBookmarks:{
        type:Array,
        default:[]
    }


}, {
    timestamps: true
});

export const Tweet = mongoose.model("Tweet", tweetShema);