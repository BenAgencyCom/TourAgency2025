// Tools
import establishPaginationProperties from "@/utils/api/establishPaginationProperties";
// Types
import type { PrismaRequestBroker, ExtraProperties } from "./@types";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { QueriesFromRequest } from "@/@types/pages/api/BulkAPIsURLQueriesHandler";

interface GeneratePaginationPropertiesParams {
    queriesFromRequest: QueriesFromRequest & ExtraProperties;
    PrismaRequestBroker: PrismaRequestBroker;
}

export default class GeneratePaginationProperties {
    private readonly PrismaRequestBroker: PrismaRequestBroker;
    private readonly queriesFromRequest: QueriesFromRequest & ExtraProperties;

    public constructor(params: GeneratePaginationPropertiesParams) {
        this.PrismaRequestBroker = params.PrismaRequestBroker;
        this.queriesFromRequest = params.queriesFromRequest;
    }

    public async generate(): Promise<{ pagination: PaginationProperties } | null> {
        const { page, perPage } = this.queriesFromRequest;
        if (!page || !perPage) return null;

        return {
            pagination: establishPaginationProperties({
                page, //
                perPage,
                recordsInTotal: await this.getRecordsInTotal(),
            }) as PaginationProperties,
        };
    }

    private async getRecordsInTotal(): Promise<number> {
        const { certianReviewType } = this.queriesFromRequest;
        if (certianReviewType) {
            return await this.PrismaRequestBroker.countRecordsWithSpecificTypeOnly(certianReviewType);
        }
        const aggregateCallResponse = await this.PrismaRequestBroker.aggregateCall({ count: true });
        return aggregateCallResponse.count as number;
    }
}
