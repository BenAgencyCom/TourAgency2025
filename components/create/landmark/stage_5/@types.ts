// Types
import type { Landmark } from "@prisma/client";
import type { DescriptionContentField } from "@/@types/Description";

export interface CreateLandmarkBody {
    destinationId: Landmark["destinationId"];
    type: Landmark["type"];
    title: Landmark["title"];
    shortDescription: Landmark["shortDescription"];
    description: DescriptionContentField[];
}
