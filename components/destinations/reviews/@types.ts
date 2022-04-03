import type { ReviewType } from "@prisma/client";

export type ChosenOrder = "newest" | "oldest" | "best" | "worst";
export type ChosenType = ReviewType | "all";
