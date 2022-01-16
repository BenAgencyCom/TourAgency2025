import { configureStore } from "@reduxjs/toolkit";

import authenticationSlice from "./slices/authentication";
import snackbarSlice from "./slices/snackbar";
import landmarks from "./slices/landmarks";
import windowSizes from "./slices/windowSizes";

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        authentication: authenticationSlice.reducer,
        snackbar: snackbarSlice.reducer,
        windowSizes: windowSizes.reducer,
        landmarks: landmarks.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
