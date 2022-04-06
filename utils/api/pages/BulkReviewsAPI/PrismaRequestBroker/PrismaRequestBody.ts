// Types
import type { URLQueriesConvertedIntoPrismaBody } from "@/@types/pages/api/BulkAPIsURLQueriesHandler";

export default class PrismaRequestBody {
    public constructor(private convertedURLsQueries: URLQueriesConvertedIntoPrismaBody) {}

    public create() {
        return {
            ...this.convertedURLsQueries,
            select: {
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
            },
        };
    }
}
