// Tools
import { createContext } from "react";
// Types
import type { ReviewType } from "@prisma/client";

export interface CreateReviewContextInterface {
    estimatedReviewColor: string;
    estimatedReviewType: ReviewType;
}

export const defaultContextData = {
    estimatedReviewColor: "#fff",
    estimatedReviewType: "NEGATIVE",
} as CreateReviewContextInterface;

export const CreateReviewContext = createContext<CreateReviewContextInterface>(defaultContextData);
