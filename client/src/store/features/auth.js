import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from './users';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuth: false,
        status: 'idle',
        error: null,
    }, 
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuth = false;
            state.status = 'idle';
            localStorage.removeItem('user');
        },
        restoreSession(state, action) {
            state.user = action.payload;
            state.isAuth = true;
            state.status = 'succeeded'
        },
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // login
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isAuth = true;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export const { logout, restoreSession  } = authSlice.actions;
export default authSlice.reducer;