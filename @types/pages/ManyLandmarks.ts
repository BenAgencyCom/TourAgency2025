import type { Landmark as _Landmark, Destination as _Destination, Continent } from "@prisma/client";
import type { NextApiResponse, NextApiRequest } from "next";

export type SortBy = "reviews" | "population";
export type orderBy = "ASC" | "DESC";

export interface Request extends NextApiRequest {
    query: {
        sortBy?: SortBy;
        orderBy?: orderBy;
        perPage?: string;
        certianContinent?: Continent;
    };
}

export interface Response extends NextApiResponse {
    data: {
        pages: Landmark[][];
        numberOfPages: number;
    };
}

export interface Landmark {
    slug: _Landmark["slug"];
    title: _Landmark["title"];
    picture: _Landmark["picture"];
    tags: _Landmark["tags"];
    type: _Landmark["type"];
    destination: {
        city: _Destination["city"];
        country: _Destination["country"];
        continent: _Destination["continent"];
        countryCode: _Destination["countryCode"];
        population: _Destination["population"];
        folder: _Destination["folder"];
        slug: _Destination["slug"];
    };
    reviews: {
        inTotal: number;
        average: number;
    };
}
