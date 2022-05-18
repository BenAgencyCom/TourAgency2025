import { configureStore } from "@reduxjs/toolkit";

import authenticationSlice from "@/redux/slices/authentication";
import snackbarSlice from "@/redux/slices/snackbar";
import windowSizes from "@/redux/slices/windowSizes";
// Create destination
import landmarksReducer from "@/redux/slices/create_destination/landmarks";
import destinationReducer from "@/redux/slices/create_destination/description";
import createContentReducer from "@/redux/slices/createContent";

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        // General purposes:
        windowSizes: windowSizes.reducer,
        authentication: authenticationSlice.reducer,
        snackbar: snackbarSlice.reducer,
        // /destinations/:slug
        // ADMIN/create new destination
        landmarks: landmarksReducer,
        description: destinationReducer,
        //
        createContent: createContentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
