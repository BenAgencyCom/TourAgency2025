// Tools
import { styled } from "@mui/system";
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
    marginRight: "5px",
    borderRadius: "5px",
    fontSize: "1.2rem",
    userSelect: "none",
    color: "#fff",
    padding: "3px 10px",
    display: "flex",
    alignItems: "center",
}));

const TagsPlaceholder: FunctionComponent = () => {
    return (
        <FlexBox sx={{ flexGrow: 1 }}>
            <FlexBox sx={{ flexGrow: 1 }}>
                <TagPlaceholder>Benefit 1</TagPlaceholder>
                <TagPlaceholder>Benefit 2</TagPlaceholder>
                <TagPlaceholder>Benefit 3</TagPlaceholder>
            </FlexBox>
            <ErrorMSG sx={{ alignSelf: "center" }}>
                At least <strong>one is required</strong>
            </ErrorMSG>
        </FlexBox>
    );
};

export default TagsPlaceholder;
