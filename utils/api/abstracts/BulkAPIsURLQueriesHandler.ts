// Tools
import { ValidationError } from "@/utils/api/Errors";
// Types
import type { QueriesFromRequest, URLQueriesConvertedIntoPrismaBody, ExtraProperty, Request, Sort, HandleResultPagination } from "@/@types/pages/api/BulkAPIsURLQueriesHandler";

export default abstract class BulkAPIsURLQueriesHandler<ExtraProperties extends Record<any, any>> {
    public quriesFromRequest: QueriesFromRequest & ExtraProperties;

    /**
     * `BulkAPIsURLQueriesHandler` - provides facilities for swift establishment tedious and
     * repetitive properties associated with querying for BulkData and suporting paggination such as `order`, `sort`, `page`
     *
     * ### Params
     * - `request`- just `NextAPIRequest`
     * - `sortable`- array of model's properties supporting sorting records (eg: [`"createdAt"`, `"points"`, `"age"`])
     * - `extraProperties`- additional properties described by **generic** type
     *
     */

    public constructor(request: Request<ExtraProperties>, sortable: string[], private extraProperties: ExtraProperty[]) {
        const { query } = request;
        // Ensure that numbers are all positive
        [(Number(query.limit), Number(query.page), Number(query.perPage))].forEach((num) => {
            if (num < 0) throw new ValidationError();
        });

        // Ensure that received properties `sort` and `orderBy` both match expecting values
        if (query.orderBy && !sortable.includes(query.orderBy)) throw new ValidationError();
        if (query.sort && !["asc", "desc"].includes(query.sort)) throw new ValidationError();
        if (!sortable.length) throw new ValidationError();

        // Additional properties validation
        const extraPropertiesObject: Record<any, any> = {};
        extraProperties.forEach((prop) => {
            const { name, values } = prop;
            const propertyHasBeenRecived: boolean = Boolean(query[name]);
            const propertyIsRequired: boolean = Boolean(prop.required);
            const propertyHasToBeSpecific: boolean = Boolean(values);

            // Validate that recived value match expected set of values
            if (propertyHasToBeSpecific) {
                const propertyMatchsExpectations: boolean = (values as any[]).includes(query[name]);
                if (propertyHasBeenRecived && !propertyMatchsExpectations) throw new ValidationError(`Unexpected value ${query[name]} for property ${name}`);
            }
            // Throw an `ValidationError` if property is required but hasn't been recived
            if (!propertyHasBeenRecived && propertyIsRequired) throw new ValidationError(`Required property **${name}** has not been provided`);

            // Apply Recived value
            if (propertyHasBeenRecived) extraPropertiesObject[name] = query[name];
            // Apply default value otherwise
            else if (prop.default !== undefined) extraPropertiesObject[name] = prop.default;
        });

        this.quriesFromRequest = {
            limit: query.limit ? Number(query.limit) : null,
            perPage: query.perPage ? Number(query.perPage) : null,
            page: query.page ? Number(query.page) : null,
            orderBy: (query.orderBy ?? sortable[0]) as string,
            sort: (query.sort ?? "desc") as Sort,
            ...extraPropertiesObject,
        } as QueriesFromRequest & ExtraProperties;
    }

    private _handlePagination(): HandleResultPagination {
        const { page, perPage, limit } = this.quriesFromRequest;

        if (page && perPage) {
            return {
                skip: (page - 1) * perPage,
                take: perPage,
            };
        } else if (limit) {
            return {
                take: limit,
            };
        }
        return {};
    }

    private _generateWhereClausule(): Record<any, any> {
        const result: Record<any, any> = {};
        this.extraProperties.forEach((prop) => {
            const value = this.quriesFromRequest[prop.name];
            if (!prop.compareWith) return;
            if (value || prop.alwaysCompare) result[prop.compareWith] = value;
        });

        return result;
    }

    /**
     * Creates body for **prisma** request such as:
     * ```ts
     * {
     *      orderBy: {
     *          createdAt: 'asc'
     *      },
     *      take: 5,
     *      skip: 30,
     * }
     * ```
     */
    public converURLQueriesIntoPrismaBody(): URLQueriesConvertedIntoPrismaBody {
        const { orderBy, sort } = this.quriesFromRequest;

        return {
            ...{
                orderBy: {
                    [orderBy]: sort,
                },
            },
            ...this._handlePagination(),
            where: this._generateWhereClausule(),
        };
    }
}

const a = {
    pagination: {
        currentPage: 22,
        perPage: 1,
        pagesInTotal: 54,
        recordsInTotal: 54,
    },
};
