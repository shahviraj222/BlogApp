import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: true,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            // console.log(action.payload)
            state.userData = action.payload; // state.userData is updated directly
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

// Exporting actions
export const { login, logout } = authSlice.actions;

// Exporting the reducer
export default authSlice.reducer;