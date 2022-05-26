/* eslint-disable import/no-anonymous-default-export */
// Types
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";
import type { Continent } from "@prisma/client";

export default (data: Landmark[], continent: Continent) => {
    data.forEach((landmark) => {
        expect(landmark.destination.continent).toEqual(continent);
    });
    if (continent !== "Australia_Oceania") expect(data.length).toBeGreaterThan(0);
};
