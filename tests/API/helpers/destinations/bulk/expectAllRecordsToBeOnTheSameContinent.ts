/* eslint-disable import/no-anonymous-default-export */
// Types
import type { Continent } from "@prisma/client";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";

export default (data: Destination[], continent: Continent) => {
    data.forEach((destination) => {
        expect(destination.continent).toEqual(continent);
    });
};
