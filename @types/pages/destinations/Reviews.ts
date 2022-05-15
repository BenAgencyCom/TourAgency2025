import type { Destination as _Destination } from "@prisma/client";

export interface Destination {
    id: _Destination["id"];
    slug: _Destination["slug"];
    city: _Destination["city"];
    country: _Destination["country"];
    continent: _Destination["continent"];
    folder: _Destination["folder"];
    shortDescription: _Destination["shortDescription"];
}
