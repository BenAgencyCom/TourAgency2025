// Tools
import BulkDataAPI from "@/utils/api/abstracts/BulkDataAPI";
// Types
import { Prisma } from "@prisma/client";
import type { NextApiRequest } from "next";
import type { Continent, LandmarkType } from "@prisma/client";
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";

interface ExtraProperties {
    continent?: Continent;
    searchingPhrase?: string;
    certainLandmarkType?: LandmarkType;
}

export class BulkLandmarksAPI extends BulkDataAPI<Prisma.LandmarkSelect, ExtraProperties> {
    public constructor(req: NextApiRequest) {
        super({
            req: req,
            model: "landmark",
            sortable: ["createdAt"],
            propertiesForSearchingPhrase: ["title_lowercase", "destination.country_lowercase", "destination.city_lowercase"],
            extraProperties: [
                {
                    name: "continent",
                    compareWith: "destination.continent",
                    values: ["Africa", "Antarctica", "Asia", "Australia_Oceania", "Europe", "North_America", "South_America"] as Continent[],
                },
                {
                    name: "certainLandmarkType",
                    compareWith: "type",
                    values: ["ANTIQUE", "ART", "BUILDING", "MONUMENT", "NATURE", "MUSEUM", "RESTAURANT"] as LandmarkType[],
                },
                {
                    name: "searchingPhrase",
                },
            ],
        });
    }

    public async getData() {
        const additionalWhereClausule: Prisma.LandmarkWhereInput = {
            status: "APPROVED",
        };
        return await this._getData<Landmark>(
            {
                slug: true,
                title: true,
                folder: true,
                type: true,
                shortDescription: true,
                destination: {
                    select: {
                        city: true,
                        country: true,
                        continent: true,
                    },
                },
            },
            additionalWhereClausule
        );
    }
}
