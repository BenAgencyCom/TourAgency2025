import superagent from "superagent";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("essa", () => {
    test("Should test /api/hello query", async () => {
        const response = await superagent.get("localhost:3000/api/hello");
        expect(response.statusCode).toEqual(200);
        expect(response.type).toEqual("application/json");
    });

    test("the fetch fails with an error", async () => {
        const data = await prisma.user.findFirst();
        console.log(data);
        expect(data).not.toBeNull();
    });
});
