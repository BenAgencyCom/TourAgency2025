import type { Destination as _Destination, Landmark as _Landmark } from "@prisma/client";

export interface Destination {
    slug: _Destination["slug"];
    city: _Destination["city"];
    country: _Destination["country"];
    population: _Destination["population"];
    continent: _Destination["continent"];
    shortDescription: _Destination["shortDescription"];
    folder: _Destination["folder"];
    landmarks: {
        folder: _Landmark["folder"];
        slug: _Landmark["slug"];
    }[];
}
