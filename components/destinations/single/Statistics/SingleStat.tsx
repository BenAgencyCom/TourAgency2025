// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
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
const Middle = styled("h5")(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: "5rem",
    lineHeight: "90px",
    margin: 0,
}));

const Header = styled("h6")(({ theme }) => ({
    fontSize: "1rem",
    margin: 0,
    fontWeight: 300,
}));

const SingleStat: FunctionComponent<SingleStatProps> = (props) => {
    return (
        <>
            <FlexBox sx={{ width: "33%" }} column center className="single-stat">
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
