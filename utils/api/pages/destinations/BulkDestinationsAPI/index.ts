// Tools
import { prisma } from "@/prisma/db";
import { selectDestination } from "./PrismaSelectPart";
import BulkAPIsURLQueriesHandler from "@/utils/api/abstracts/BulkAPIsURLQueriesHandler";
// Types
import type { NextApiRequest } from "next";
import type { Continent } from "@prisma/client";

interface ExtraProperties {
    continent?: Continent;
    searchingPhrase?: string;
}

export default class BulkDestinationsApi extends BulkAPIsURLQueriesHandler<ExtraProperties> {
    public constructor(req: NextApiRequest) {
        super(
            req as any,
            ["createdAt", "population"],
            [
                {
                    name: "continent",
                    compareWith: "continent",
                    values: ["Africa", "Antarctica", "Asia", "Australia_Oceania", "Europe", "North_America", "South_America"] as Continent[],
                },
                {
                    name: "searchingPhrase",
                },
            ]
        );
    }

    public async getDestinations() {
        const result = await prisma.destination.findMany(this._createPrismaRequestBody());

        const recordsInTotal = await this._getAmountOfRecordsInTotal();
        const pagination = this.establishPaginationProperties(recordsInTotal);

        return {
            destinations: result,
            ...(pagination ? { pagination } : null),
        };
    }

    protected _createPrismaRequestBody(props?: { shorten?: boolean }) {
        const { where, ...generatedPrismaBody } = this.converURLQueriesIntoPrismaBody();
        const { searchingPhrase } = this.quriesFromRequest;

        return {
            where: {
                ...where,
                ...(searchingPhrase && {
                    OR: [
                        {
                            country_lowercase: {
                                contains: searchingPhrase.toLowerCase(),
                            },
                        },
                        {
                            city_lowercase: {
                                contains: searchingPhrase.toLowerCase(),
                            },
                        },
                    ],
                }),
            },
            ...(!props?.shorten && {
                ...selectDestination,
                ...generatedPrismaBody,
            }),
        };
    }

    protected async _getAmountOfRecordsInTotal(): Promise<number> {
        interface Result {
            _count: { _all: number };
        }

        const result = (await prisma.destination.aggregate({
            _count: { _all: true },
            ...(this._createPrismaRequestBody({ shorten: true }) as any),
        })) as Result;

        return result._count._all;
    }
}
