// Tools
import { forwardRef } from "react";
import { styled, alpha } from "@mui/system";
// Types
import type { Feedback } from "@prisma/client";
import type { ForwardRefExoticComponent } from "react";
// Material UI Components
import ButtonBase from "@mui/material/ButtonBase";
// Material UI Icons
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbDown from "@mui/icons-material/ThumbDown";

const ThumbsBase = styled(ButtonBase)(({ theme }) => ({
    marginRight: "10px",
    marginTop: "10px",
    fontWeight: 700,
    svg: {
        marginRight: "5px",
    },
    padding: "3px 0",
    "&.authenticated-user-choice": {
        padding: "3px",
        background: theme.palette.primary.main,
        color: "#fff",
        "&:hover": {
            background: alpha(theme.palette.primary.main, 0.6),
        },
    },
}));

interface ThumbProps {
    feedback: number;
    type: "DISLIKE" | "LIKE";
    authenticatedUserChoice?: Feedback | null;
}

const Thumb: ForwardRefExoticComponent<ThumbProps> = forwardRef((props, ref) => {
    const { feedback, authenticatedUserChoice, type, ...propsToForward } = props;

    return (
        <ThumbsBase
            color="inherit" //
            ref={ref as any}
            {...propsToForward}
            className={authenticatedUserChoice === type ? "authenticated-user-choice" : ""}
        >
            {type === "LIKE" ? <ThumbUp /> : <ThumbDown />}
            {feedback}
        </ThumbsBase>
    );
});

Thumb.displayName = "Thumb";
export default Thumb;
