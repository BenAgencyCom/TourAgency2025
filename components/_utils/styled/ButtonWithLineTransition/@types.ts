import type { ReactNode } from "react";
import type { SxProps } from "@mui/system";

export type Direction = "left" | "right" | "top" | "bottom";

export interface ButtonWrapperParams {
    primary?: true;
    reverse?: true;
    color?: string;
    background?: string;
    line?: Direction;
    onClick?: () => any;
}

export interface ButtonWithLineTransitionProps extends ButtonWrapperParams {
    children: ReactNode;
    sx?: SxProps;
    className?: string;
    id?: string;
}
