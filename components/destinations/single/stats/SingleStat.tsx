// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// Styled components
import FlexBoxColumnCenter from "@/components/_utils/styled/FlexBoxColumnCenter";

interface SingleStatProps {
    top: string | ReactNode;
    middle: string | number;
    bottom: string | ReactNode;
    // Optional
    hideDivider?: boolean;
}
const Middle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: "5rem",
}));

const Header = styled(Typography)(({ theme }) => ({
    fontSize: "1rem",
}));

const SingleStat: FunctionComponent<SingleStatProps> = (props) => {
    return (
        <>
            <FlexBoxColumnCenter sx={{ width: "33%" }}>
                <Header>{props.top}</Header>
                <Middle>{props.middle}</Middle>
                <Header>{props.bottom}</Header>
            </FlexBoxColumnCenter>

            {(() => {
                if (!props.hideDivider) return <Divider flexItem light orientation="vertical"></Divider>;
            })()}
        </>
    );
};

export default SingleStat;
