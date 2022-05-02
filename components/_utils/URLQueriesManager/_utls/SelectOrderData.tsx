// Types
import type { SelectProps, SelectExtraOrderOption } from "../@types";
// Material UI Icons
import SortByAlpha from "@mui/icons-material/SortByAlpha";

interface SelectOrderData extends Omit<SelectProps, "options"> {
    options: SelectExtraOrderOption[];
}

/**
 * ### Important
 * The reason behind making this piece of code apart from the `SelectOrder` component
 * is the proccess of handling establishing default values of state's properties
 * ---
 * It's only part for `allSelects` array! The only param is an array of choosen ordering propereties,
 * which is going to be converted by function to match principals of the following interface *{key:string, value:any}*
 */
// eslint-disable-next-line import/no-anonymous-default-export
export const selectOrder = (extraOrderOptions?: SelectExtraOrderOption[]): SelectOrderData => {
    const options: SelectExtraOrderOption[] = [
        {
            label: "Newest",
            value: "newest",
            "data-compounded-value": "orderBy=createdAt&sort=desc",
        },
        {
            label: "Oldest",
            value: "oldest",
            "data-compounded-value": "orderBy=createdAt&sort=asc",
        },
        ...(extraOrderOptions ?? []),
    ];

    return {
        icon: <SortByAlpha />,
        key: "order",
        options: options,
        defaultValue: "newest",
    };
};
