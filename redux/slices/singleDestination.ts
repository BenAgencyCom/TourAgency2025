// Tools
import { createSlice } from "@reduxjs/toolkit";
// Types
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Destination } from "@/@types/pages/SingleDestination";

interface SingleDestinationState {
    data: Destination;
    ratings: number;
    totalReviews: number;
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
            id: "",
            reviews: [],
        },
        ratings: 0,
        totalReviews: 0,
    } as SingleDestinationState,
    reducers: {
        setData: (state, action: PayloadAction<Destination>) => {
            state.data = action.payload;
        },
        setRatings: (state, action: PayloadAction<number>) => {
            state.ratings = action.payload;
        },
        setTotalReviews: (state, action: PayloadAction<number>) => {
            state.totalReviews = action.payload;
        },
    },
});

export default slice;
export const { setData, setRatings, setTotalReviews } = slice.actions;
