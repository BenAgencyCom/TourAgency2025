import type { Landmark as _Landmark, Destination as _Destination } from "@prisma/client";

export interface Landmark {
    slug: _Landmark["slug"];
    title: _Landmark["title"];
    folder: _Landmark["folder"];
    type: _Landmark["type"];
    shortDescription: _Landmark["shortDescription"];
    destination: {
        city: _Destination["city"];
        country: _Destination["country"];
        continent: _Destination["continent"];
    };
}
