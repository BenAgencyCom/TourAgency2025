// Types
import type { ReviewType } from "@prisma/client";
import type { NextApiRequest } from "next";

export type Sort = "asc" | "desc";
export type URLQueriesConvertedIntoPrismaBody = HandleResultPagination &
    DistinguishedOrder & {
        where: Record<any, any>;
    };

export interface QueriesFromRequest {
    limit: number | null;
    perPage: number | null;
    page: number | null;
    certianReviewType: ReviewType | null;
    orderBy: string;
    sort: Sort;
}

export interface Request<ExtraProperties> extends NextApiRequest {
    query: {
        page?: string;
        perPage?: string;
        orderBy?: string;
        sort?: string;
        limit?: string;
    } & ExtraProperties;
}
export interface DistinguishedOrder {
    orderBy: Record<string, Sort>;
}
export interface HandleResultPagination {
    skip?: number;
    take?: number;
}

export interface ExtraProperty {
    name: string;
    values: any[];
    default: any;
    required?: boolean;
    compareBy?: string;
    alwaysCompare?: boolean;
}