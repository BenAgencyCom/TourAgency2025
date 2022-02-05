import { createSlice } from "@reduxjs/toolkit";

interface WindowSizesSlice {
    width: number;
    height: number;
    scrollY: number;
}

const windowSizesSlice = createSlice({
    name: "windowSize",
    initialState: {
        width: 0,
        height: 0,
        scrollY: 0,
    } as WindowSizesSlice,
    reducers: {
        resize: (state) => {
            state.width = window.innerWidth;
            state.height = window.innerHeight;
        },
        setScroll: (state) => {
            state.scrollY = window.scrollY;
        },
    },
});

export default windowSizesSlice;
export const { resize, setScroll } = windowSizesSlice.actions;
