// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Skeleton from "@mui/material/Skeleton";
// Other components
import ScoreInStars from "@/components/_utils/ScoreInStars";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
const StarsWrapper = styled(FlexBox)(({ theme }) => ({
    margin: "10px 0",
    svg: {
        color: theme.palette.primary.main,
        fontSize: "2.5rem",
    },
}));

interface StarsProps {
    score?: number;
}

const Stars: FunctionComponent<StarsProps> = (props) => {
    return (
        <StarsWrapper>
            {(() => {
                if (props.score) return <ScoreInStars score={props.score}></ScoreInStars>;
                else return <Skeleton variant="rectangular" sx={{ width: "250px", height: "40px" }}></Skeleton>;
            })()}
        </StarsWrapper>
    );
};

export default Stars;
