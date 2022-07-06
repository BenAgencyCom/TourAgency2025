// Tools
import { styled } from "@mui/system";
import { fadeIn } from "@/components/_utils/styled/keyframes";
// Types
import type { FunctionComponent } from "react";
// Styled components
import { ErrorMSG } from "@/components/_utils/LengthNotification";

const FlexBox = styled("div")(({ theme }) => ({
    display: "flex",
    flexGrow: 1,
}));

const TagPlaceholder = styled("div")(({ theme }) => ({
    background: theme.palette.text.primary,
    borderRadius: "3px",
    fontSize: "1.1rem",
    userSelect: "none",
    color: "#fff",
    padding: "3px 10px",
    display: "flex",
    alignItems: "center",
    height: "30px",
    margin: "5px 5px 5px 0",
    animation: `${fadeIn} .3s ease-in-out both`,
    "&:nth-of-type(2)": {
        animationDelay: ".05s",
    },
    "&:nth-of-type(3)": {
        animationDelay: ".1s",
    },
}));

const TagsPlaceholder: FunctionComponent = () => {
    return (
        <>
            <FlexBox sx={{ flexGrow: 1 }}>
                <TagPlaceholder>Benefit 1</TagPlaceholder>
                <TagPlaceholder>Benefit 2</TagPlaceholder>
                <TagPlaceholder>Benefit 3</TagPlaceholder>
            </FlexBox>
            <ErrorMSG sx={{ alignSelf: "center", mt: "5px" }}>
                At least <strong>one is required</strong>
            </ErrorMSG>
        </>
    );
};

export default TagsPlaceholder;
