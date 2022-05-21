// Types
import type { LandmarkType } from "@prisma/client";
import type { DescriptionContentField } from "@/@types/Description";

export interface ParsedRequestBody {
    destinationId: string;
    title: string;
    shortDescription: string;
    type: LandmarkType;
    description: DescriptionContentField[];
}
