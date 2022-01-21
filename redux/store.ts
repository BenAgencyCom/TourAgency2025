import { configureStore } from "@reduxjs/toolkit";

import authenticationSlice from "@/redux/slices/authentication";
import snackbarSlice from "@/redux/slices/snackbar";
import windowSizes from "@/redux/slices/windowSizes";
import testsReducer from "@/redux/slices/tests";
// Create destination
import landmarksReducer from "@/redux/slices/create_destination/landmarks";
import destinationReducer from "@/redux/slices/create_destination/description";

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
        description: destinationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
