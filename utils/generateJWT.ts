import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
//
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;
const access_expiration = process.env.ACCESS_TOKEN_EXPIRATION as string;
//
//
export interface JWTUser {
    [key: string]: "password" | "id" | "createdAt";
}
//
const generateJWT = (user: User): string => {
    const propertiesToToken = ["password", "id", "createdAt"];
    const dataToToken = {} as JWTUser;
    //
    propertiesToToken.forEach((prop) => {
        dataToToken[prop] = (user as any)[prop];
    });
    return jwt.sign(dataToToken, access_secret, { expiresIn: access_expiration });
};
export default generateJWT;
