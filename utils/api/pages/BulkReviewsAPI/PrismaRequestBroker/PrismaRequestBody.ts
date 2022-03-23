import type { ReviewsCallParams, OrderBy, Sort } from "@/@types/pages/api/ReviewsAPI";

interface HandleResultPagination {
    skip?: number;
    take?: number;
}

type OrderPossibilies = "createdAt" | "points";

export default class PrismaRequestBody {
    public constructor(private params: ReviewsCallParams) {}

    private _handlePagination(): HandleResultPagination {
        if (!this.params) throw new Error("");

        if (this.params.page && this.params.perPage) {
            return {
                skip: (this.params.page - 1) * this.params.perPage,
                take: this.params.perPage,
            };
        } else if (this.params.limit) {
            return {
                take: this.params.limit,
            };
        }
        return {};
    }

    private _distinguishOrder(): { orderBy: Record<OrderPossibilies, Sort> } {
        const orderingBy: OrderPossibilies = (
            {
                latest: "createdAt",
                score: "points",
            } as Record<OrderBy, OrderPossibilies>
        )[this.params.orderBy];

        return { orderBy: { [orderingBy]: this.params.sort } } as any;
    }

    public create() {
        return {
            ...this._handlePagination(),
            ...this._distinguishOrder(),
            select: {
                id: true,
                review: true,
                points: true,
                createdAt: true,
                tags: true,
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
