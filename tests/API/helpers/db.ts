import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
export const API_ADDRESS = "http://localhost:3000";

export default prisma;
