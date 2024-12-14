import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlicer';

export const store = configureStore({
    reducer: {
        users: userReducer
    }
})