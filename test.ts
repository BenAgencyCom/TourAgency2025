import { PrismaClient } from "@prisma/client";
import faker from "faker";
const prisma = new PrismaClient();

const stworz = async () => {
    await prisma.user.create({
        data: {
            name: "Kacper",
            occupation: "React developer",
            email: "kacper@prisma.io",
            posts: {
                create: {
                    title: "Lowienie wegorzy w meksyku",
                    content: faker.lorem.words(60),
                    categories: {
                        create: {
                            name: "Hobby",
                        },
                    },
                },
            },
            profile: {
                create: {
                    biograpy: faker.lorem.words(25),
                },
            },
        },
    });
    console.log("Data has been created successfully");
};

const wyswietl = async () => {
    const result = await prisma.user.findMany({
        select: {
            name: true,
            occupation: true,
            email: true,
            profile: {
                select: {
                    biograpy: true,
                },
            },
            posts: {
                select: {
                    title: true,
                    published: true,
                    content: true,
                    categories: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
    console.log(result[0].posts);
};

wyswietl();
