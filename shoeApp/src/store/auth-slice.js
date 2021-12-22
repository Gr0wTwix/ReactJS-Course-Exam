import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
    userId: null,
    accessToken: null,
    isLoggedIn: false
};

const authSlice = createSlice({
    name: 'auth-slice',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.userId = action.payload.userId;
            state.accessToken = action.payload.accessToken;
            state.isLoggedIn = true;
        },
        logout(state, action) {
            state.userId = initialAuthState.userId;
            state.accessToken = initialAuthState.accessToken;
            state.isLoggedIn = false;
        }
    }
});

export default authSlice;