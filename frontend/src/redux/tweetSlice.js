import { createSlice } from '@reduxjs/toolkit';

const tweetSlice = createSlice({
    name: "tweets",
    initialState: {
        tweets: null,
        refresh: false,
    },
    reducers: {
        getMyTweets: (state, action) => {
            state.tweets = action.payload;
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh;
        }
    }
});

export const { getMyTweets, getRefresh } = tweetSlice.actions;
export default tweetSlice.reducer;