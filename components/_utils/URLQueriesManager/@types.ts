// Types
import type { ReactNode } from "react";
import type { SxProps } from "@mui/system";

export interface SelectOption {
    label: string;
    value: any;
}
/**
 * You can sort data based on one particualr property in two
 * different ways **ASCENDING** and **DESCENDING** and in order not to
 * overcomplex the transforming and storing proccess making it vulnerable
 * to act in unintended way, two properties are reflected by one value, which
 * is basically just an alias for them. For instance
 * ```ts
 * [
 *      {
 *       label: "Newest",
 *       value: "newest",
 *       "data-compounded-value": "orderBy=createdAt&sort=desc",
 *      },
 *      {
 *       label: "Oldest",
 *       value: "oldest",
 *       "data-compounded-value": "orderBy=createdAt&sort=asc",
 *      },
 * ]
 * ```
 */
export interface SelectExtraOrderOption extends Omit<SelectOption, "value"> {
    /**An alias for two (or even I deem more) compounded properties */
    value: any;
    /**An actual value */
    "data-compounded-value": string;
}

export interface SelectProps {
    /** The name of the property */
    key: string;
    /* The array of extra select options */
    options: SelectOption[];
    /* **Mui Icon** to enrich the general appearance */
    icon: ReactNode;
    sx?: SxProps;
    /** It is required for enabling of value's reseting */
    defaultValue?: any;
    /** Omit this particular property when it has its default value during generating string query to fatch data*/
    omitIfDeafult?: true;
}
