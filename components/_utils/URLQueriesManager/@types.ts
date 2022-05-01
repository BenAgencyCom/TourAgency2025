// Types
import type { ReactNode } from "react";
import type { SxProps } from "@mui/system";

export interface SelectOption {
    label: string;
    value: any;
}

export interface SelectExtraOrderOption extends SelectOption {
    "data-compounded-value": string;
}

export interface SelectProps {
    key: string;
    options: SelectOption[];
    defaultValue?: any;
    icon: ReactNode;
    sx?: SxProps;
    /** Omit this particular property when it has its default value during generating string query to fatch data*/
    omitIfDeafult?: true;
}
