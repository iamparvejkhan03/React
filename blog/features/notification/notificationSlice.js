import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginNotification: false,
    loginNotificationText: null,
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification: (state, action) => {
            state.loginNotification = true;
            state.loginNotificationText = action.payload;
        },
        hideNotification: (state, action) => {
            state.loginNotification = false;
        }
    }
});

const notificationReducer = notificationSlice.reducer;

export const {showNotification, hideNotification} = notificationSlice.actions;
export default notificationReducer;