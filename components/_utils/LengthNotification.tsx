// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { Restriction } from "@/@types/Restriction";
// Styled components

const LengthNotificationBase = styled("span")<{ error?: boolean }>(({ theme, ...props }) => ({
    fontSize: "1.2rem",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItmes: "center",
    marginTop: "5px",
    color: props.error ? theme.palette.error.main : theme.palette.text.primary,
    strong: {
        fontWeight: "900",
        "&.primary": {
            color: props.error ? theme.palette.error.main : theme.palette.primary.main,
        },
    },
}));

const ErrorMSG = styled("span")(({ theme }) => ({
    color: theme.palette.error.main,
    fontSize: "1.1rem",
    strong: {
        color: "inherit",
    },
}));

interface LengthNotificationProps {
    text: string;
    fieldName: string;
    restrictions: Restriction;
}

const LengthNotification: FunctionComponent<LengthNotificationProps> = (props) => {
    const { text, restrictions, fieldName } = props;
    const { length } = text;
    const { min, max } = restrictions;

    return (
        <LengthNotificationBase>
            <span>
                Length: <strong className="primary">{`${length} / ${max}`}</strong>
            </span>
            {/* Errors */}
            {(() => {
                if (length > max) {
                    return (
                        <ErrorMSG>
                            {`The ${fieldName} field must `}
                            <strong>{`be up to ${max} characters long!`}</strong>
                        </ErrorMSG>
                    );
                } else if (length < min) {
                    return (
                        <ErrorMSG>
                            {`The ${fieldName} field must be `}
                            <strong>{`at least ${min} characters long!`}</strong>
                        </ErrorMSG>
                    );
                }
            })()}
        </LengthNotificationBase>
    );
};

export default LengthNotification;
