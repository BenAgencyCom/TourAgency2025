import type { User, Destination, Landmark, DestinationReview } from "@prisma/client";

export { User, Destination, Landmark, DestinationReview };

export type ModelName = "user" | "destination" | "landmark" | "destinationReview";
export type SeederDataList<T extends User | Destination | Landmark | DestinationReview> = Partial<
    {
        _imagesDir: string;
    } & T
>[];
