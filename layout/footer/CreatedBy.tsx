// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const CreatedByWrapper = styled(FlexBox)(({ theme }) => ({
    width: "100%",
    height: "40px",
    textTransform: "uppercase",
    fontWeight: 500,
    background: theme.palette.primary.main,
    userSelect: "none",
    cursour: "pointer",
}));

const CreatedBy: FunctionComponent = () => {
    return (
        <CreatedByWrapper center>
            <a href="https://github.com/BenAgencyCom" target="_blank" rel="noreferrer" tabIndex={0}>
                Created by Tyler
            </a>
        </CreatedByWrapper>
    );
};

export default CreatedBy;
