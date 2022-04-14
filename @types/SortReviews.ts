import type { ReviewType } from "@prisma/client";

export type Order = "newest" | "oldest" | "best" | "worst";
export type ScoreType = ReviewType | "all";
export type ReviewingType = "landmark" | "destination";
