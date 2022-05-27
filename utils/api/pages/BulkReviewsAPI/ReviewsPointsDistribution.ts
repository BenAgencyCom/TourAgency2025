// Types
import type { PrismaRequestBroker } from "./@types";
import type { ReviewsCallResponse } from "@/@types/pages/api/ReviewsAPI";

interface ReviewsPointsDistributionParams {
    PrismaRequestBroker: PrismaRequestBroker;
    applyPointsDistribution: boolean;
}

interface EstablishedPointsDistribution {
    pointsDistribution: ReviewsCallResponse["pointsDistribution"];
    statistics: ReviewsCallResponse["statistics"];
}

export default class ReviewsPointsDistribution {
    private readonly PrismaRequestBroker: PrismaRequestBroker;
    private readonly applyPointsDistribution: boolean;

    public constructor(params: ReviewsPointsDistributionParams) {
        this.PrismaRequestBroker = params.PrismaRequestBroker;
        this.applyPointsDistribution = params.applyPointsDistribution;
    }

    public async establish(): Promise<EstablishedPointsDistribution | null> {
        if (!this.applyPointsDistribution) return null;
        const statistics = await this.PrismaRequestBroker.aggregateCall({ count: true, avgScore: true });

        return {
            pointsDistribution: await this.PrismaRequestBroker.pointsDistribution(),
            statistics: {
                averageScore: statistics.avgScore as number,
                recordsInTotal: statistics.count as number,
            },
        };
    }
}
