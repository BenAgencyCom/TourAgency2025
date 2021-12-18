import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
    name: string;
    surname: string;
    avatar: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    country: {
        name: string;
        code: string;
    };
}

export interface AuthenticationState {
    isAuthenticated: boolean | null;
    userData: UserData | null;
}

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        isAuthenticated: null,
        userData: null,
    } as AuthenticationState,
    reducers: {
        setAuthentication: (state, action: PayloadAction<AuthenticationState["isAuthenticated"]>) => {
            state.isAuthenticated = action.payload;
        },
        setUserData: (state, action: PayloadAction<UserData | null>) => {
            if (action.payload === null) localStorage.removeItem("userData");
            else localStorage.setItem("userData", JSON.stringify(action.payload));

            state.userData = action.payload;
        },
        getUserFromLocalStorage: (state) => {
            const userFormLocalStorage = localStorage.getItem("userData");
            if (userFormLocalStorage) {
                const parsedLocalStorage = JSON.parse(userFormLocalStorage);
                const { name, surname, gender, country } = parsedLocalStorage;
                const { name: countryName, code } = country;
                if (name && surname && gender && countryName && code) {
                    state.userData = parsedLocalStorage as AuthenticationState["userData"];
                }
            }
        },
    },
});

export default authenticationSlice;
export const { setAuthentication, setUserData, getUserFromLocalStorage } = authenticationSlice.actions;
