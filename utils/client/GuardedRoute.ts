// Tools
import { prisma } from "@/prisma/db";
// Types
import type { GetServerSidePropsResult, GetServerSidePropsContext } from "next";

const AUHTORIZED_RESPONSE: GetServerSidePropsResult<{}> = {
    props: {},
};
const UNAUTHORIZED_RESPONSE: GetServerSidePropsResult<{}> = {
    props: {},
    redirect: {
        permanent: false,
        destination: "/",
    },
};

const GuardedRoute = async (intensitivity: "user" | "admin", ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> => {
    const { accessToken } = ctx.req.cookies;
    if (!accessToken) return UNAUTHORIZED_RESPONSE;

    const session = await prisma.session.findUnique({ where: { accessToken }, select: { user: { select: { isAdmin: true } } } });

    let authorized = null;
    if (intensitivity === "admin") authorized = Boolean(session?.user.isAdmin);
    else if (intensitivity === "user") authorized = Boolean(session?.user);

    return authorized ? AUHTORIZED_RESPONSE : UNAUTHORIZED_RESPONSE;
};

export default GuardedRoute;
