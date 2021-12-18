import { createSlice } from "@reduxjs/toolkit";

interface WindowSizesSlice {
    width: number;
    height: number;
}

const windowSizesSlice = createSlice({
    name: "windowSize",
    initialState: {
        width: 0,
        height: 0,
    } as WindowSizesSlice,
    reducers: {
        resize: (state) => {
            state.width = window.innerWidth;
            state.height = window.innerHeight;
        },
    },
});

export default windowSizesSlice;
export const { resize } = windowSizesSlice.actions;
