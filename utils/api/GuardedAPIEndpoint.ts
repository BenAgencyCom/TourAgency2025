// Tools
import { prisma } from "@/prisma/db";
import { Forbidden, MethodNotAllowed } from "@/utils/api/Errors";
// Types
import type { NextApiRequest } from "next";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Intensitivity = "admin" | "user" | "anonymous";
/**
 * Guarded API endpoint
 * Throwns:
 * - `Forbidden`-  when access is denied
 * - `MethodNotAllowed`-  if method is not allowed
 * Returns
 * - `null` when anonymous is expected and simply there is nothing to be returned
 * - Otherwise, the object matching following scheme will be returned:
 * ```ts
 *  {
 *      authenticatedUserId: string,
 *      isAdmin: boolean
 *  }
 * ```
 */

export interface GuardedAPIResponse {
    authenticatedUserId: string;
    isAdmin: boolean;
}

const GuardedAPIEndpoint = async (req: NextApiRequest, method: Method, intensitivity: Intensitivity): Promise<GuardedAPIResponse | null> => {
    if (req.method !== method) throw new MethodNotAllowed();
    const { accessToken } = req.cookies;
    // Anonymous authorized
    if (!accessToken && intensitivity === "anonymous") return null;
    else if (accessToken && intensitivity === "anonymous") throw new Forbidden();
    else if (!accessToken && intensitivity !== "anonymous") throw new Forbidden();

    const session = await prisma.session.findUnique({
        where: { accessToken }, //
        select: { user: { select: { isAdmin: true, id: true } } },
    });

    const response: GuardedAPIResponse = {
        authenticatedUserId: session?.user.id as string,
        isAdmin: session?.user.isAdmin as boolean,
    };

    switch (intensitivity) {
        case "admin":
            if (session?.user.isAdmin === false) throw new Forbidden();
            else return response;
        case "user":
            if (session === null) throw new Forbidden();
            else return response;
        case "anonymous":
            if (session !== null) throw new Forbidden();
            break;
    }
    return null;
};

export default GuardedAPIEndpoint;
