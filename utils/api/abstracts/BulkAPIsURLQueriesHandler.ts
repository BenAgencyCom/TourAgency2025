// Tools
import { ValidationError } from "@/utils/api/Errors";
import transformPrismaNastedModels from "@/utils/api/transformPrismaNastedModels";
import _establishPaginationProperties from "@/utils/api/establishPaginationProperties";
// Types
import { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { QueriesFromRequest, URLQueriesConvertedIntoPrismaBody, ExtraProperty, Request, Sort, HandleResultPagination } from "@/@types/pages/api/BulkAPIsURLQueriesHandler";

export default abstract class BulkAPIsURLQueriesHandler<ExtraProperties extends Record<any, any>> {
    public queriesFromRequest: QueriesFromRequest & ExtraProperties;

    /**
     * `BulkAPIsURLQueriesHandler` - provides facilities for swift establishing tedious and
     * repetitive properties associated with querying for BulkData and suporting paggination such as `order`, `sort`, `page`
     *
     * ### Params
     * - `request`- just `NextApiRequest`
     * - `sortable`- array of model's properties supporting sorting records (eg: [`"createdAt"`, `"points"`, `"age"`])
     * - `extraProperties`- additional properties described by **generic** type
     *
     * ### Throws
     * - `ValidationError`- when something is wrong with recived req.query
     */

    public constructor(request: Request<ExtraProperties>, sortable: string[], private extraProperties: ExtraProperty[]) {
        const { query } = request;
        // Ensure that numbers are all positive
        [(Number(query.limit), Number(query.page), Number(query.perPage))].forEach((num) => {
            if (num < 0) throw new ValidationError("All numbers have to be positive!");
        });

        // Ensure that received properties `sort` and `orderBy` both match expecting values
        if (query.orderBy && !sortable.includes(query.orderBy)) {
            throw new ValidationError(`Unexpeced value **${query.orderBy}** for **orderBy** property. Expected values: ${JSON.stringify(sortable)}`);
        }
        if (query.sort && !["asc", "desc"].includes(query.sort)) {
            throw new ValidationError(`Sort property has to be either "asc" or "desc"`);
        }
        if (!sortable.length) {
            // `createdAt` cannot be taken as default value here due to the fact, that this property's name might vary throughout different ORM approaches
            throw new ValidationError("At least one model's property has to be included in sortable in order to perform ANY kind of soring");
        }

        // Additional properties validation
        const extraPropertiesObject: Record<any, any> = {};
        extraProperties.forEach((prop) => {
            const { name, values } = prop;
            const propertyHasBeenRecived: boolean = Boolean(query[name]);
            const propertyIsRequired: boolean = Boolean(prop.required);
            const propertyHasToBeSpecific: boolean = Boolean(values);
            const propertyHasAlias: boolean = Boolean(prop.alias);

            // Validate that recived value match expected set of values
            if (propertyHasToBeSpecific) {
                const propertyMatchsExpectations: boolean = (values as any[]).includes(query[name]);
                if (propertyHasBeenRecived && !propertyMatchsExpectations) throw new ValidationError(`Unexpected value ${query[name]} for property ${name}`);
            }
            // Throw an `ValidationError` if property is required but hasn't been recived
            if (!propertyHasBeenRecived && propertyIsRequired) throw new ValidationError(`Required property **${name}** has not been provided`);

            const finalName: string = propertyHasAlias ? (prop.alias as string) : prop.name;

            // Apply Recived value
            if (propertyHasBeenRecived) extraPropertiesObject[finalName] = query[name];
            // Apply default value otherwise
            else if (prop.default !== undefined) extraPropertiesObject[finalName] = prop.default;
        });

        this.queriesFromRequest = {
            limit: query.limit ? Number(query.limit) : null,
            perPage: query.perPage ? Number(query.perPage) : null,
            page: query.page ? Number(query.page) : null,
            orderBy: (query.orderBy ?? sortable[0]) as string,
            sort: (query.sort ?? "desc") as Sort,
            ...extraPropertiesObject,
        } as QueriesFromRequest & ExtraProperties;
    }

    private _handlePagination(): HandleResultPagination {
        const { page, perPage, limit } = this.queriesFromRequest;

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

    private _generateWhereClausule(_excludedIDs: string[] = []): Record<any, any> {
        let result: Record<any, any> = {};
        const excludedIDs: string[] = _excludedIDs;

        this.extraProperties.forEach((prop) => {
            const value = this.queriesFromRequest[prop.alias ? prop.alias : prop.name];
            // Handle comparision
            if (prop.compareWith && (value !== undefined || prop.alwaysCompare)) {
                result = { ...result, ...transformPrismaNastedModels(prop.compareWith, value) };
            }
            // Handle excluding
            if (prop.treatThisPropertyAsIDandExcludeItFromResults && value !== undefined) excludedIDs.push(value);
        });
        result = {
            ...result,
            ...{
                id: { not: { in: excludedIDs } },
            },
        };

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
    protected converURLQueriesIntoPrismaBody(_excludedIDs: string[] = []): URLQueriesConvertedIntoPrismaBody {
        const { orderBy, sort } = this.queriesFromRequest;

        return {
            ...{
                orderBy: {
                    [orderBy]: sort,
                },
            },
            ...this._handlePagination(),
            where: this._generateWhereClausule(_excludedIDs),
        };
    }
    /**
     * Generates pagination properties
     */
    protected establishPaginationProperties(recordsInTotal: number): PaginationProperties | false {
        return _establishPaginationProperties({
            recordsInTotal,
            page: this.queriesFromRequest.page,
            perPage: this.queriesFromRequest.perPage,
        });
    }
}
