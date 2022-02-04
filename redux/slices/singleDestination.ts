// Tools
import { createSlice } from "@reduxjs/toolkit";
// Types
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Destination } from "@/@types/pages/SingleDestination";

interface SingleDestinationState {
    data: Destination;
}

const slice = createSlice({
    name: "SingleDestination",
    initialState: {
        data: {
            city: "",
            continent: "Africa",
            country: "",
            description: [],
            folder: "",
            landmarks: [],
            population: 0,
            shortDescription: "",
            slug: "",
        },
    } as SingleDestinationState,
    reducers: {
        setData: (state, action: PayloadAction<Destination>) => {
            state.data = action.payload;
        },
    },
});

export default slice;
export const { setData } = slice.actions;
