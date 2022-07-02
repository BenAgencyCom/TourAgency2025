/* eslint-disable import/no-anonymous-default-export */
// Types
import type { Continent } from "@prisma/client";
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";

export default (data: Landmark[], continent: Continent) => {
    data.forEach((landmark) => {
        expect(landmark.destination.continent).toEqual(continent);
    });
};
