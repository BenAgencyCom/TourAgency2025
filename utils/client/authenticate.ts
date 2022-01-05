import axios from "axios";
import Router from "next/router";
import type { UserData } from "@/redux/slices/authentication";

interface AuthenticateTokenResponseData {
    accepted: boolean;
    sessionExired?: boolean;
}

export const authenticateToken = async () => {
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

export const getUserData = async (): Promise<UserData> => {
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
