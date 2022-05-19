// Tools
import { styled } from "@mui/system";
// Types
import type { ReactNode } from "react";
import type { Restriction } from "@/@types/Restriction";
// Styled components
const ErrorMSG = styled("span")(({ theme }) => ({
    color: theme.palette.error.main,
    fontSize: "1.1rem",
    strong: {
        color: "inherit",
    },
}));

/**
 * If string given as first parameter does not fulfill restrictions passed as second param then generate a `JSX` explanation
 */
export const lengthRestrictionMessage = (text: string, restrictions: Restriction, field: string = "field"): ReactNode => {
    const { length } = text;
    const { min, max } = restrictions;

    const OnlyLengthInformation: ReactNode = (
        <span>
            Length: <strong>{`${length} / ${max}`}</strong>
        </span>
    );

    if (length > max)
        return (
            <>
                {OnlyLengthInformation}
                <ErrorMSG>
                    {`The ${field} field must `}
                    <strong>{`be up to ${max} characters long!`}</strong>
                </ErrorMSG>
            </>
        );
    else if (length < min)
        return (
            <>
                {OnlyLengthInformation}
                <ErrorMSG>
                    {`The ${field} field must be `}
                    <strong>{`at least ${min} characters long!`}</strong>
                </ErrorMSG>
            </>
        );
    else
        return (
            <span>
                Length: <strong>{`${length} / ${max}`}</strong>
            </span>
        );
};

/**
 * Returns `true` if any error occurred
 */
export const validateLength = (text: number | string, restrictions: Restriction, isNumber: boolean = false): boolean => {
    const length = isNumber ? (text as number) : (text as string).length;
    const { min, max } = restrictions;

    return length > max || length < min;
};
