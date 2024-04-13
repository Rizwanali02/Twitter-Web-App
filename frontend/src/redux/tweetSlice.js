import { createSlice } from '@reduxjs/toolkit';

const tweetSlice = createSlice({
    name: "tweets",
    initialState: {
        tweets: null,
        refresh: false,
        isActiveTab: true,
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
        }
    }
});

export const { getMyTweets, getRefresh, getIsActiveTab } = tweetSlice.actions;
export default tweetSlice.reducer;