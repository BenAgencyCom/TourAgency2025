import { prisma } from "@/prisma/db";
import type { NextApiRequest } from "next";
import { Forbidden, NotFound } from "@/utils/api/Errors";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Intensitivity = "admin" | "user" | "anonymous";
/**
 * Guarded API endpoint
 *
 * @throws {Forbidden} if access is denied
 * @throws {NotFound} if method is not allowed
 *
 * @async
 * @returns {string | null} id of authenticated either user of admin
 */

const GuardedAPIEndpoint = async (req: NextApiRequest, method: Method, intensitivity: Intensitivity): Promise<string | null> => {
    if (req.method !== method) throw new NotFound();
    const { accessToken } = req.cookies;
    // Anonymous authorized
    if (!accessToken && intensitivity === "anonymous") return null;
    else if (accessToken && intensitivity === "anonymous") throw new Forbidden();
    else if (!accessToken && intensitivity !== "anonymous") throw new Forbidden();

    const session = await prisma.session.findUnique({
        where: { accessToken }, //
        select: { user: { select: { isAdmin: true, id: true } } },
    });

    switch (intensitivity) {
        case "admin":
            if (session?.user.isAdmin === false) throw new Forbidden();
            else return session?.user.id as string;
        case "user":
            if (session === null) throw new Forbidden();
            else return session?.user.id as string;
        case "anonymous":
            if (session !== null) throw new Forbidden();
            break;
    }
    return null;
};

export default GuardedAPIEndpoint;
