const ROUTES_WITH_DISABLED_NAVIGATION: string[] = [];
const ROUTES_WITH_REVERSED_CONTRAST: string[] = ["/landmarks/*", "/destinations/*", "/"];

/**
 * Accepts one parameter of `router.pathname` and determines whether the navbar should be completly hidden
 */
export const isDisabled = (currentPathname: string): boolean => {
    return ROUTES_WITH_DISABLED_NAVIGATION.includes(currentPathname);
};
/**
 * Accepts one parameter of `router.pathname` and determines whether the navbar should have reverced
 * WHITE and BLACK so as to make better contrast
 *
 * Routes determined in `ROUTES_WITH_REVERSED_CONTRAST` can be either:
 * - precise- like `"/destinations"` and refer to only one particular route,
 * - general- like `"/users/*`" and refer to all routes matching given base
 */
export const isContrastReversed = (currentPathname: string): boolean => {
    if (currentPathname.includes("/reviews")) return false;

    return Boolean(
        ROUTES_WITH_REVERSED_CONTRAST.find((route) => {
            // General searching scenerio:
            if (route.includes("*")) {
                const subfields = route.split("*");
                return !Boolean(subfields.find((subfiled) => !currentPathname.includes(subfiled)));
            }
            // Precise searching
            else return route === currentPathname;
        })
    );
};
