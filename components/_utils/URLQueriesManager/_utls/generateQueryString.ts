// Types
import type { NextRouter } from "next/router";
import type { SelectProps, SelectExtraOrderOption } from "../@types";

interface GenerateQueryStringParams {
    allSelects: SelectProps[];
    otherURLQueries?: string[];
    state: Record<string, any>;
    routerQueries: NextRouter["query"];
}

const getCompoundedOrder = (params: GenerateQueryStringParams): string => {
    const orderProps = params.allSelects.find(({ key }) => key === "order") as SelectProps;
    const orderOptions = orderProps.options as SelectExtraOrderOption[];
    // Find compounded value reflecting order property stored in `state`
    const orderInState = params.state["order"];
    return (orderOptions.find((target) => target.value === orderInState) as SelectExtraOrderOption)["data-compounded-value"];
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (params: GenerateQueryStringParams) => {
    const { state, allSelects, otherURLQueries, routerQueries } = params;
    const result: string[] = [];
    // Page
    result.push(`page=${state["page"] ?? 1}`);
    // Order
    result.push(getCompoundedOrder(params));
    // Searching phrase
    const searchingPhrase = state["searchingPhrase"];
    if (searchingPhrase && searchingPhrase.length > 0) result.push(`searchingPhrase=${searchingPhrase}`);
    // Marge all select's values into one
    allSelects.forEach((select) => {
        const { defaultValue, omitIfDeafult, key, options } = select;
        const valueInState = state[key];
        if (key === "order") return;
        // Check whether default:
        if (valueInState === defaultValue && omitIfDeafult) return;
        // Ensure that value is appropriate
        if (options.findIndex((target) => target.value === valueInState) === -1) return;
        result.push(`${key}=${valueInState}`);
    });
    // Handle other url queries
    if (otherURLQueries) {
        otherURLQueries.forEach((key) => {
            const value = routerQueries[key];
            if (value !== undefined) result.push(`${key}=${value}`);
        });
    }
    return `?${result.join("&")}`;
};
