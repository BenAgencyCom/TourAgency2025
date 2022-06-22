// Tools
import { styled } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
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
    alternateBackgroundText?: string;
    sx?: SxProps;
}

const StageHeader: FunctionComponent<StageHeaderProps> = (props) => {
    const { alternateBackgroundText, stageNumber, title } = props;
    return (
        <StageHeaderWrapper sx={props.sx}>
            <Typography variant="h2">{title}</Typography>
            <BackgroundHeader
                fontSize="6rem" //
            >
                {alternateBackgroundText ? alternateBackgroundText : `STAGE ${stageNumber}`}
            </BackgroundHeader>
        </StageHeaderWrapper>
    );
};

export default StageHeader;
