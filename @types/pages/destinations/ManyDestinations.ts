import type { Destination as _Destination } from "@prisma/client";

export interface Destination {
    slug: _Destination["slug"];
    city: _Destination["city"];
    country: _Destination["country"];
    population: _Destination["population"];
    continent: _Destination["continent"];
    shortDescription: _Destination["shortDescription"];
    folder: _Destination["folder"];
    _count: {
        landmarks: number;
    };
}
