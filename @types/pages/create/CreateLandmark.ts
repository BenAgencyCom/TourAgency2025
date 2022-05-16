import type { Destination as _Destination, Landmark as _Landmark } from "@prisma/client";

export interface Destination {
    id: _Destination["id"];
    city: _Destination["city"];
    country: _Destination["country"];
    continent: _Destination["continent"];
    shortDescription: _Destination["shortDescription"];
    folder: _Destination["folder"];
}
