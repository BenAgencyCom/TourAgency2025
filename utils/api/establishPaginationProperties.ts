import { PaginationProperties } from "@/@types/pages/api/Pagination";

interface EstablishPaginationParams {
    page?: number | null;
    perPage?: number | null;
    recordsInTotal: number;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (params: EstablishPaginationParams): PaginationProperties | false => {
    const { page, perPage, recordsInTotal } = params;
    if (!page || !perPage) return false;

    const floored = Math.floor(recordsInTotal / perPage);

    return {
        currentPage: page,
        perPage: perPage,
        pagesInTotal: recordsInTotal % perPage ? floored + 1 : floored,
        recordsInTotal,
    };
};
