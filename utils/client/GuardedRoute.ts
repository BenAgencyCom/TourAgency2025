// Tools
import { prisma } from "@/prisma/db";
// Types
import type { GetServerSidePropsResult, GetServerSidePropsContext } from "next";

const AUHTORIZED_RESPONSE: GetServerSidePropsResult<{}> = {
    props: {},
};
const UNAUTHORIZED_RESPONSE = (destination: "/login" | "/not-found" | "/"): GetServerSidePropsResult<{}> => {
    return {
        props: {},
        redirect: {
            permanent: false,
            destination,
        },
    };
};

const GuardedRoute = async (intensitivity: "user" | "admin" | "anonymous", ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> => {
    const { accessToken } = ctx.req.cookies;
    if (!accessToken) {
        return intensitivity === "anonymous" ? AUHTORIZED_RESPONSE : UNAUTHORIZED_RESPONSE("/login");
    }
    const session = await prisma.session.findUnique({ where: { accessToken }, select: { user: { select: { isAdmin: true } } } });

    switch (intensitivity) {
        case "admin":
            if (Boolean(session?.user.isAdmin)) return AUHTORIZED_RESPONSE;
            else return UNAUTHORIZED_RESPONSE("/not-found");
        case "user":
            if (Boolean(session?.user)) return AUHTORIZED_RESPONSE;
            else return UNAUTHORIZED_RESPONSE("/not-found");
        case "anonymous":
            if (!Boolean(session?.user)) return AUHTORIZED_RESPONSE;
            else return UNAUTHORIZED_RESPONSE("/");
    }
};

export default GuardedRoute;
