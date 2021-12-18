import { configureStore } from "@reduxjs/toolkit";

import authenticationSlice from "./slices/authentication";
import snackbarSlice from "./slices/snackbar";

const store = configureStore({
    reducer: {
        authentication: authenticationSlice.reducer,
        snackbar: snackbarSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
