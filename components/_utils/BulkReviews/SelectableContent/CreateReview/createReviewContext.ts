// Tools
import { createContext } from "react";
// Types
import type { ReviewType } from "@prisma/client";
import type { StatedDataField } from "@/@types/StatedDataField";

export interface CreateReviewContextInterface {
    estimatedReviewColor: string;
    estimatedReviewType: ReviewType;

    tags: StatedDataField<string[]>;
    scoreInt: StatedDataField<number>;
    scoreFloat: StatedDataField<number>;
    reviewContent: StatedDataField<string>;
}

export const CreateReviewContext = createContext<CreateReviewContextInterface>({} as any);
