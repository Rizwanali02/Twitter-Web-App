import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        otherUsers: null,
        profile: null,
        token: null,

    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
        },
        getOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        getMyProfile: (state, action) => {
            state.profile = action.payload;
        },
        getToken: (state, action) => {
            state.token = action.payload;
        },


    }
});

export const { getUser, getOtherUsers, getMyProfile, getToken } = userSlice.actions;
export default userSlice.reducer;
