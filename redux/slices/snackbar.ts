import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
    display: boolean;
    msg: string;
    severity: "success" | "error" | "warning" | "info";
}

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: {
        display: false,
        msg: "",
        severity: "info",
    } as SnackbarState,
    reducers: {
        displaySnackbar: (state, action: PayloadAction<Omit<SnackbarState, "display">>) => {
            if (state.display) return;
            state.msg = action.payload.msg;
            state.severity = action.payload.severity;
            state.display = true;
        },
        closeSnackbar: (state) => {
            state.display = false;
        },
    },
});

export default snackbarSlice;
export const { displaySnackbar, closeSnackbar } = snackbarSlice.actions;
