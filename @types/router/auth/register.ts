import type { NextApiRequest, NextApiResponse } from "next";
import type { CountryType } from "@/data/countries";

export interface RegisterBody {
    name: string;
    surname: string;
    email: string;
    country: CountryType;
    sex: "MALE" | "FEMALE" | "OTHER";
    password: string;
    passwordRepeatation: string;
    born: Date;
}
export interface RegisterRequest extends NextApiRequest {
    body: RegisterBody;
}
