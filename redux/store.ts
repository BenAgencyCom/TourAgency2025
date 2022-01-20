import { configureStore } from "@reduxjs/toolkit";

import authenticationSlice from "./slices/authentication";
import snackbarSlice from "./slices/snackbar";
import landmarksReducer from "./slices/landmarks";
import windowSizes from "./slices/windowSizes";
import testsReducer from "./slices/tests";

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        authentication: authenticationSlice.reducer,
        snackbar: snackbarSlice.reducer,
        windowSizes: windowSizes.reducer,
        landmarks: landmarksReducer,
        tests: testsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
