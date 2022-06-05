import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SnackbarState {
    display: boolean;
    msg: string;
    severity: "success" | "error" | "warning" | "info";
    hideAfter?: number | null;
}

export interface DisplaySnackbarParams {
    msg: string;
    severity: "success" | "error" | "warning" | "info";
    hideAfter?: number | null;
}

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: {
        display: false,
        msg: "",
        severity: "info",
        hideAfter: null,
    } as SnackbarState,
    reducers: {
        displaySnackbar: (state, action: PayloadAction<Omit<SnackbarState, "display">>) => {
            state.msg = action.payload.msg;
            state.severity = action.payload.severity;
            state.display = true;
            state.hideAfter = action.payload.hideAfter ? action.payload.hideAfter : null;
        },
        closeSnackbar: (state) => {
            state.display = false;
        },
    },
});

export default snackbarSlice;
export const { displaySnackbar, closeSnackbar } = snackbarSlice.actions;
