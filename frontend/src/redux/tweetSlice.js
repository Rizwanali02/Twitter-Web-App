import { createSlice } from '@reduxjs/toolkit';

const tweetSlice = createSlice({
    name: "tweets",
    initialState: {
        tweets: null,
        refresh: false,
        isActiveTab: true,
        myTweets:null,
    },
    reducers: {
        getMyTweets: (state, action) => {
            state.tweets = action.payload;
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh;
        },
        getIsActiveTab: (state, action) => {
            state.isActiveTab = action.payload;
        },
        getMyUserTweets: (state, action) => {
            state.myTweets = action.payload;
        },
    }
});

export const { getMyTweets, getRefresh, getIsActiveTab ,getMyUserTweets} = tweetSlice.actions;
export default tweetSlice.reducer;