// Types
import type { NextRouter } from "next/router";

interface UpdateURLQueriesParams {
    routerQueries: NextRouter["query"];
    state: Record<string, any>;
    otherURLQueries?: string[];
}
// eslint-disable-next-line import/no-anonymous-default-export
export default (params: UpdateURLQueriesParams) => {
    const { routerQueries, state, otherURLQueries } = params;
    const queryProperties = [];

    for (const key in state) {
        const value = state[key];
        routerQueries[key] = value;
        queryProperties.push(`${key}=${value}`);
    }
    if (otherURLQueries) {
        otherURLQueries.forEach((key) => {
            const value = routerQueries[key];
            if (value !== undefined) queryProperties.push(`${key}=${value}`);
        });
    }

    const baseURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
    const updatedURL = `${baseURL}?${queryProperties.join("&")}`;
    window.history.pushState({ path: updatedURL }, "", updatedURL);
};
