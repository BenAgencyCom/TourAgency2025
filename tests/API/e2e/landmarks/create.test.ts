/**
 * @jest-environment node
 */

// Tools
import { PrismaClient } from "@prisma/client";
import { testPOSTRequestStatus } from "../../helpers/testStatus";
import { API_URL, convertJSONintoFormData, landmarkDataForCreation, destinationPrismaData, DESTINATION_ID, VERY_LONG_STRING } from "../../data/createLandmark/index";
// Types

const prisma = new PrismaClient();

describe("create new landmark", () => {
    beforeAll(async () => {
        await prisma.destination.create(destinationPrismaData);
    });
    afterAll(async () => {
        await prisma.destination.delete({ where: { id: DESTINATION_ID } });
    });

    describe("VALIDATION", () => {
        describe("Missing fields", () => {
            test("Without destinationID", async () => {
                const body = landmarkDataForCreation;
                delete body.destinationId;
                await testPOSTRequestStatus({
                    expectedStatus: 422,
                    endpoint: API_URL,
                    body: convertJSONintoFormData(body),
                });
            });
            test("W/o title", async () => {
                const body = landmarkDataForCreation;
                await testPOSTRequestStatus({
                    expectedStatus: 422,
                    endpoint: API_URL,
                    body: convertJSONintoFormData(body),
                });
            });
            test("W/o shortDescription", async () => {
                const body = landmarkDataForCreation;
                delete body.shortDescription;
                await testPOSTRequestStatus({
                    expectedStatus: 422,
                    endpoint: API_URL,
                    body: convertJSONintoFormData(body),
                });
            });
            test("W/o description", async () => {
                const body = landmarkDataForCreation;
                delete body.destinationId;
                await testPOSTRequestStatus({
                    expectedStatus: 422,
                    endpoint: API_URL,
                    body: convertJSONintoFormData(body),
                });
            });
            test("W/o thumbnail", async () => {
                const body = landmarkDataForCreation;
                delete body.destinationId;
                await testPOSTRequestStatus({
                    expectedStatus: 422,
                    endpoint: API_URL,
                    body: convertJSONintoFormData(body),
                });
            });
        });
        describe("Invalid values", () => {
            test("DestinationID without coverage", async () => {
                const body = landmarkDataForCreation;
                body.destinationId = "UNEXISTING_DESTINATION_ID";
                await testPOSTRequestStatus({
                    expectedStatus: 422,
                    endpoint: API_URL,
                    body: convertJSONintoFormData(body),
                });
            });
            test("Invalid title- too little", async () => {
                const body = landmarkDataForCreation;
                body.title = "1";
                await testPOSTRequestStatus({
                    expectedStatus: 422,
                    endpoint: API_URL,
                    body: convertJSONintoFormData(body),
                });
            });
            test("Invalid title- too big", async () => {
                const body = landmarkDataForCreation;
                body.title = VERY_LONG_STRING;
                await testPOSTRequestStatus({
                    expectedStatus: 422,
                    endpoint: API_URL,
                    body: convertJSONintoFormData(body),
                });
            });
            test("Invalid shortDescription- too little", async () => {
                const body = landmarkDataForCreation;
                body.shortDescription = "a";
                await testPOSTRequestStatus({
                    expectedStatus: 422,
                    endpoint: API_URL,
                    body: convertJSONintoFormData(body),
                });
            });
            test("Invalid description- too big", async () => {
                const body = landmarkDataForCreation;
                body.shortDescription = VERY_LONG_STRING;
                await testPOSTRequestStatus({
                    expectedStatus: 422,
                    endpoint: API_URL,
                    body: convertJSONintoFormData(body),
                });
            });
            test("Invalid thumbnail- unsupporting extension", async () => {
                await testPOSTRequestStatus({
                    expectedStatus: 422,
                    endpoint: API_URL,
                    body: convertJSONintoFormData(landmarkDataForCreation, true),
                });
            });
        });
    });
});
