/**
 * ### Params:
 * - `property`- property or chain of properties to be compared with value given as a second argument
 * - `expectedValue`- self-evident
 * - `prismaProperty`- *optional*- allows user to simply use a different method of
 *                    making comparison instead performed unwittingly "equal"
 *
 * ### What does it do:
 *
 * transforms: string like: `"destination.city_lowercase"`
 *
 * into: object like
 * ```
 *  {
 *      destination: {
 *          city_lowercase: {
 *              contains: "received_searching_phrase"
 *          }
 *      }
 *  }
 * ```
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default (property: string, expectedValue: string, prismaProperty?: "contains") => {
    const nastedModels = property.split(".").reverse();
    if (nastedModels.length === 1) return prismaProperty ? { [property]: { [prismaProperty]: expectedValue } } : { [property]: expectedValue };

    let result: any = prismaProperty ? { [prismaProperty]: expectedValue } : expectedValue;
    for (const nastedModel of nastedModels) {
        result = { [nastedModel]: result };
    }

    return result;
};
