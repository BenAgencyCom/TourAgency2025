// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import ButtonBase from "@mui/material/ButtonBase";
import Tooltip from "@mui/material/Tooltip";
// Material UI Icons
import Star from "@mui/icons-material/Star";
import TextSnippet from "@mui/icons-material/TextSnippet";
// Styled Components
const StyledButton = styled(ButtonBase)(({ theme }) => ({
    position: "absolute",
    bottom: "10px",
    right: "60px",
    zIndex: "1",
    width: "40px",
    height: "40px",
    background: theme.palette.primary.main,
    color: "#fff",
    borderRadius: "5px",
}));

interface ToggleReviewButtonProps {
    displayReview: StatedDataField<boolean>;
}

const ToggleReviewButton: FunctionComponent<ToggleReviewButtonProps> = (props) => {
    const reviewIsOpted: boolean = !!props.displayReview.value;
    const toggle = () => props.displayReview.setValue((value) => !value);

    return (
        <Tooltip title={reviewIsOpted ? "Show information" : "Show review"} placement="top">
            <StyledButton onClick={toggle}>{reviewIsOpted ? <TextSnippet /> : <Star />}</StyledButton>
        </Tooltip>
    );
};

export default ToggleReviewButton;
