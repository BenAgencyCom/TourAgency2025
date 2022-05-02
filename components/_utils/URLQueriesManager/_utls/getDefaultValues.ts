// Types
import type { SelectProps } from "../@types";
import type { NextRouter } from "next/router";

interface GetDefaultValuesParams {
    routerQueries: NextRouter["query"];
    allSelects: SelectProps[];
    expectedProperties: string[];
    lookForASeachingPhrase: boolean;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (params: GetDefaultValuesParams): Record<string, any> => {
    const { routerQueries, expectedProperties, allSelects, lookForASeachingPhrase } = params;
    const updatedState: Record<string, any> = {};

    const getDefaultValue = (prop: string) => {
        const obj = allSelects.find((target) => target.key === prop) as SelectProps;
        return obj.defaultValue !== undefined ? obj.defaultValue : obj.options[0].value;
    };

    const URLPropertyExists = (prop: string): boolean => Object.keys(routerQueries).includes(prop);
    const URLPropertyIsValid = (prop: string, value: any): boolean =>
        Boolean(
            allSelects
                .find((target) => target.key === prop)
                ?.options.map((target) => target.value)
                .includes(value)
        );

    expectedProperties.forEach((expectedProperty: string) => {
        const setExpectedProperty = (val: any) => (updatedState[expectedProperty] = val);
        const useDefaultValue = () => setExpectedProperty(getDefaultValue(expectedProperty));

        if (URLPropertyExists(expectedProperty)) {
            const value = routerQueries[expectedProperty];
            return URLPropertyIsValid(expectedProperty, value) ? setExpectedProperty(value) : useDefaultValue();
        } else {
            useDefaultValue();
        }
    });
    // Searching phrase
    if (lookForASeachingPhrase) {
        const { searchingPhrase } = routerQueries;
        if (searchingPhrase && searchingPhrase.length > 0) updatedState["searchingPhrase"] = searchingPhrase;
    }
    // Page
    const { page } = routerQueries;
    if (page && !isNaN(Number(page))) updatedState["page"] = page;

    return updatedState;
};
