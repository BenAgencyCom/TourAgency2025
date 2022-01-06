// Tools
import axios from "axios";
// Types
import { PrismaClient } from "@prisma/client";
import type { UserHelper } from "./data/users";
// helpers
import { prepareUser } from "./data/users";
const API_ADDRESS = "http://localhost:3000";
//
const prisma = new PrismaClient();
//

describe("Guarded API endpoints", () => {
    const users: string[] = []; // Array of User's ID which will be used after all tests to remove created Users from the DB
    let adminUser: UserHelper = {
        userData: null,
        accessToken: null,
    };
    let notAdminUser: UserHelper = {
        userData: null,
        accessToken: null,
    };

    type Endpoint = "admin" | "user" | "anonymous";
    const testStatus = async (endpoint: Endpoint, expectedStatus: number, Cookie: string = "") => {
        await axios
            .get(`${API_ADDRESS}/api/_tests/${endpoint}`, { headers: { Cookie } })
            .then(({ status }) => {
                expect(status).toEqual(expectedStatus);
            })
            .catch(({ response }) => {
                expect(response.status).toEqual(expectedStatus);
            });
    };

    beforeAll(async () => {
        const _prepareUser = async (isAdmin: boolean = false): Promise<UserHelper> => {
            const result = await prepareUser(isAdmin);
            users.push(result.userData?.id as string);
            return result;
        };
        adminUser = await _prepareUser(true);
        notAdminUser = await _prepareUser();
    });
    afterAll(async () => {
        await prisma.user.deleteMany({ where: { id: { in: users } } });
    });

    describe("ADMIN", () => {
        test("Admin should have access to **admin** restricted API", async () => {
            await testStatus("admin", 200, adminUser.accessToken as string);
        });
        test("Admin should have access to **user** restricted API", async () => {
            await testStatus("user", 200, adminUser.accessToken as string);
        });
        test("Admin should NOT have access to **anonymous** restricted API", async () => {
            await testStatus("anonymous", 401, adminUser.accessToken as string);
        });
    });
    describe("USER", () => {
        test("User should NOT have access to **admin** restricted API", async () => {
            await testStatus("admin", 401, notAdminUser.accessToken as string);
        });
        test("User should have access to **user** restricted API", async () => {
            await testStatus("user", 200, notAdminUser.accessToken as string);
        });
        test("User should NOT have access to **anonymous** restricted API", async () => {
            await testStatus("anonymous", 401, notAdminUser.accessToken as string);
        });
    });
    describe("ANONYMOUS", () => {
        test("Anonymous should NOT have access to **admin** restricted API", async () => {
            await testStatus("admin", 401);
        });
        test("Anonymous should NOT have access to **user** restricted API", async () => {
            await testStatus("user", 401);
        });
        test("Anonymous should have access to **anonymous** restricted API", async () => {
            await testStatus("anonymous", 200);
        });
    });
});
