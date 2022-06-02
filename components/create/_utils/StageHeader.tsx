// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other components
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";
// Styled components
const StageHeaderWrapper = styled("div")(({ theme }) => ({
    margin: "0 0 50px 0",
    position: "relative",
}));
interface StageHeaderProps {
    title: string;
    stageNumber: number;
}

const StageHeader: FunctionComponent<StageHeaderProps> = (props) => {
    return (
        <StageHeaderWrapper>
            <Typography variant="h1">{props.title}</Typography>
            <BackgroundHeader fontSize="10rem">{`STAGE ${props.stageNumber}`}</BackgroundHeader>
        </StageHeaderWrapper>
    );
};

export default StageHeader;
