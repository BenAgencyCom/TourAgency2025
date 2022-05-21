// Types
import type { Landmark } from "@prisma/client";

export interface ValidLandmarkData {
    destinationId: Landmark["destinationId"];
    type: Landmark["type"];
    title: Landmark["title"];
    shortDescription: Landmark["shortDescription"];
    description: Landmark["description"];
    thumbnail: boolean;
}
