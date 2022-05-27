/**
 * @jest-environment node
 */

// Tools
import prisma from "@/tests/API/helpers/db";
import { testGETRequestStatus } from "@/tests/API/helpers/testStatus";
// Types
import type { UserHelper } from "@/tests/API/data/users";
// helpers
import { prepareUser } from "@/tests/API/data/users";
//
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
    const _enpoint = (endpoint: Endpoint) => `/api/_tests/${endpoint}`;

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
            await testGETRequestStatus(_enpoint("admin"), 200, adminUser.accessToken as string);
        });
        test("Admin should have access to **user** restricted API", async () => {
            await testGETRequestStatus(_enpoint("user"), 200, adminUser.accessToken as string);
        });
        test("Admin should NOT have access to **anonymous** restricted API", async () => {
            await testGETRequestStatus(_enpoint("anonymous"), 403, adminUser.accessToken as string);
        });
    });
    describe("USER", () => {
        test("User should NOT have access to **admin** restricted API", async () => {
            await testGETRequestStatus(_enpoint("admin"), 403, notAdminUser.accessToken as string);
        });
        test("User should have access to **user** restricted API", async () => {
            await testGETRequestStatus(_enpoint("user"), 200, notAdminUser.accessToken as string);
        });
        test("User should NOT have access to **anonymous** restricted API", async () => {
            await testGETRequestStatus(_enpoint("anonymous"), 403, notAdminUser.accessToken as string);
        });
    });
    describe("ANONYMOUS", () => {
        test("Anonymous should NOT have access to **admin** restricted API", async () => {
            await testGETRequestStatus(_enpoint("admin"), 403);
        });
        test("Anonymous should NOT have access to **user** restricted API", async () => {
            await testGETRequestStatus(_enpoint("user"), 403);
        });
        test("Anonymous should have access to **anonymous** restricted API", async () => {
            await testGETRequestStatus(_enpoint("anonymous"), 200);
        });
    });
});
