import type { User, Destination, Landmark } from "@prisma/client";

export { User, Destination, Landmark };
export type SeederDataList<T> = Partial<
    {
        _imagesDir: string;
    } & T
>[];
