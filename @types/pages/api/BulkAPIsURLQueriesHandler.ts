// Types
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
    values?: any[];
    alias?: string;
    default?: any;
    required?: boolean;
    compareWith?: string;
    alwaysCompare?: boolean;
    treatThisPropertyAsIDandExcludeItFromResults?: true;
}
