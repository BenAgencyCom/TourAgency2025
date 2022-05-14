import type { Landmark as _Landmark, Destination as _Destination } from "@prisma/client";

export interface Destination {
    city: _Destination["city"];
    country: _Destination["country"];
    continent: _Destination["continent"];
}

export interface Landmark {
    id: _Landmark["id"];
    slug: _Landmark["slug"];
    title: _Landmark["title"];
    type: _Landmark["type"];
    folder: _Landmark["folder"];
    shortDescription: _Landmark["shortDescription"];
    destination: Destination;
}
