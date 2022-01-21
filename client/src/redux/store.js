import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";
import searchSlice from "./searchSlice";
export default configureStore({
    reducer: {
        auth: authSlice,
        profile: profileSlice,
        search: searchSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})