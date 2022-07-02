// Tools
import BulkDataAPI from "@/utils/api/abstracts/BulkDataAPI";
// Types
import { Prisma } from "@prisma/client";
import type { NextApiRequest } from "next";
import type { Continent } from "@prisma/client";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";

interface ExtraProperties {
    continent?: Continent;
    searchingPhrase?: string;
}

export default class BulkLandmarksAPI extends BulkDataAPI<Prisma.DestinationSelect, ExtraProperties> {
    public constructor(req: NextApiRequest) {
        super({
            req: req,
            model: "destination",
            sortable: ["createdAt", "population"],
            propertiesForSearchingPhrase: ["country_lowercase", "city_lowercase"],
            extraProperties: [
                {
                    name: "continent",
                    compareWith: "continent",
                    values: ["Africa", "Antarctica", "Asia", "Australia_Oceania", "Europe", "North_America", "South_America"] as Continent[],
                },
                {
                    name: "searchingPhrase",
                },
            ],
        });
    }

    public async getData() {
        const additionalWhereClausule: Prisma.DestinationWhereInput = {
            status: "APPROVED",
        };
        return await this._getData<Destination>(
            {
                slug: true,
                city: true,
                country: true,
                population: true,
                continent: true,
                shortDescription: true,
                folder: true,
                landmarks: {
                    select: {
                        folder: true,
                        slug: true,
                    },
                    take: 3,
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
            additionalWhereClausule
        );
    }
}
