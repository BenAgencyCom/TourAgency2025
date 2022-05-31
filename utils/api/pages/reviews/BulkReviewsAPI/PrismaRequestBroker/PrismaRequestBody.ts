// Types
import type { URLQueriesConvertedIntoPrismaBody } from "@/@types/pages/api/BulkAPIsURLQueriesHandler";

export default class PrismaRequestBody {
    public constructor() {}
    /**
     * Returns onyly **prisma select clause** only, similar to:
     * ```ts
     * {
     *      id: true,
     *      name: true,
     *      email: true
     * }
     * ```
     */
    public getSelect() {
        return {
            id: true,
            review: true,
            points: true,
            createdAt: true,
            tags: true,
            type: true,
            reviewer: {
                select: {
                    id: true,
                    name: true,
                    surname: true,
                    country: true,
                    countryCode: true,
                    gender: true,
                    avatar: true,
                    birth: true,
                },
            },
        };
    }

    /**
     * Returns object with all **prisma find many** properties, like `orderBy`, `where` and `select`
     */
    public create(convertedURLsQueries: URLQueriesConvertedIntoPrismaBody) {
        return {
            ...convertedURLsQueries,
            select: this.getSelect(),
        };
    }
}
