// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

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
    lineHeight: "90px",
}));

const Header = styled(Typography)(({ theme }) => ({
    fontSize: "1rem",
}));

const SingleStat: FunctionComponent<SingleStatProps> = (props) => {
    return (
        <>
            <FlexBox sx={{ width: "33%" }} column center>
                <Header>{props.top}</Header>
                <Middle>{props.middle}</Middle>
                <Header>{props.bottom}</Header>
            </FlexBox>

            {(() => {
                if (!props.hideDivider) return <Divider flexItem light orientation="vertical"></Divider>;
            })()}
        </>
    );
};

export default SingleStat;
