import type { User } from "@prisma/client";

export { User };
export type SeederDataList<T> = Partial<
    {
        _imagesDir: string;
    } & T
>[];
