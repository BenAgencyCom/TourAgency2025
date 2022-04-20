import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import LocalStorageUserData from "@/@types/LocalStorageUserData";

export interface AuthenticationState {
    isAuthenticated: boolean | null;
    userData: LocalStorageUserData | null;
}

export class ThereIsNoUserDataInLocalStorage extends Error {}
export class UserDataStructureIsInvalid extends Error {}
export class StoredUserIsAdmin extends Error {}

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
        setUserData: (state, action: PayloadAction<LocalStorageUserData | null>) => {
            if (action.payload === null) localStorage.removeItem("userData");
            else localStorage.setItem("userData", JSON.stringify(action.payload));

            state.userData = action.payload;
        },
        getUserFromLocalStorage: (state) => {
            const data = localStorage.getItem("userData");
            if (data === null) throw new ThereIsNoUserDataInLocalStorage();

            const userFormLocalStorage = JSON.parse(data);
            const { name, surname, gender, country, isAdmin, id } = userFormLocalStorage;
            const { name: countryName, code } = country;

            if (name && surname && gender && countryName && code && id) {
                state.userData = userFormLocalStorage as AuthenticationState["userData"];
                if (isAdmin) {
                    throw new StoredUserIsAdmin();
                }
            } else {
                throw new UserDataStructureIsInvalid();
            }
        },
    },
});

export default authenticationSlice;
export const { setAuthentication, setUserData, getUserFromLocalStorage } = authenticationSlice.actions;
