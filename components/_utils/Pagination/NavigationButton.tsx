// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Icons
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
// Styled components
import PaginationStep from "./PaginationStep";

const NavigationButtonBase = styled(PaginationStep)(({ theme }) => ({
    "&.disabled": {
        border: `2px solid rgb(130,143,156)`,
        background: alpha(theme.palette.text.primary, 0.5),
        color: theme.palette.text.primary,
    },
    "&.next": {
        marginLeft: "20px",
    },
    "&.previous": {
        marginRight: "20px",
    },

    ["@media (max-width:600px)"]: {
        "&.next": {
            marginLeft: "10px",
        },
        "&.previous": {
            marginRight: "10px",
        },
    },
}));

interface PaginationNavigationButtonProps {
    direction: "next" | "previous";
    disabled: boolean;
    onClick: () => void;
}

const PaginationNavigationButton: FunctionComponent<PaginationNavigationButtonProps> = (props) => {
    return (
        <NavigationButtonBase
            current={false} //
            className={[
                props.disabled ? "disabled" : "", //
                props.direction,
            ].join(" ")}
            onClick={() => {
                if (!props.disabled) props.onClick();
            }}
        >
            {(() => {
                switch (props.direction) {
                    case "next":
                        return <ArrowForward />;
                    case "previous":
                        return <ArrowBack />;
                }
            })()}
        </NavigationButtonBase>
    );
};

export default PaginationNavigationButton;
