import axios from "axios";
import Router from "next/router";
import LocalStorageUserData from "@/@types/LocalStorageUserData";

interface AuthenticateTokenResponseData {
    accepted: boolean;
    sessionExired?: boolean;
}

const authenticateTokenBroker = async (): Promise<boolean> => {
    try {
        const { data }: { data: AuthenticateTokenResponseData } = await axios.post("/api/auth/authenticate_token");
        if (data.sessionExired) {
            Router.push("/login");
            return false;
        }
        return data.accepted;
    } catch (e: unknown) {
        return false;
    }
};
export const authenticateToken = async (): Promise<boolean> => {
    const result = await authenticateTokenBroker();
    if (!result) localStorage.removeItem("userData");

    return result;
};

export const getUserData = async (): Promise<LocalStorageUserData> => {
    const { data } = await axios.get("/api/current_user_data");
    return data;
};

export const checkWhetherUserIsAdmin = async (): Promise<boolean> => {
    try {
        const { data } = await axios.get("/api/current_user_data");
        return data.isAdmin;
    } catch (e: unknown) {
        return false;
    }
};
