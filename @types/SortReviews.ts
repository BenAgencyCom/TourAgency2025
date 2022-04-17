import type { ReviewType, Continent as _Continent } from "@prisma/client";

export type Order = "newest" | "oldest" | "best" | "worst" | "biggest" | "smallest";
export type ScoreType = ReviewType | "all";
export type ReviewingType = "landmark" | "destination";
export type Continent = _Continent | "all";
