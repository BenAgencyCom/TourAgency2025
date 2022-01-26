import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// eslint-disable-next-line import/no-anonymous-default-export
export default (on: any, config: any) => {
    on("task", {
        async deleteRegisteredUser(email: string) {
            return await prisma.user.deleteMany({
                where: {
                    email: {
                        in: [email],
                    },
                },
            });
        },
    });
};
