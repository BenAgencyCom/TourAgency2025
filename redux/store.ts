import { configureStore } from "@reduxjs/toolkit";

import authenticationSlice from "./slices/authentication";
import snackbarSlice from "./slices/snackbar";
import windowSizes from "./slices/windowSizes";

const store = configureStore({
    reducer: {
        authentication: authenticationSlice.reducer,
        snackbar: snackbarSlice.reducer,
        windowSizes: windowSizes.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
