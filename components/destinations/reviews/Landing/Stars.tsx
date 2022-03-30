// Tools
import { styled } from "@mui/system";
// Types

import type { FunctionComponent } from "react";
// Other components
import ScoreInStars from "@/components/_utils/ScoreInStars";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
const StarsWrapper = styled(FlexBox)(({ theme }) => ({
    marginTop: "20px",
    svg: {
        color: theme.palette.primary.main,
        fontSize: "2.5rem",
    },
}));

interface StarsProps {
    score: number;
}

const Stars: FunctionComponent<StarsProps> = (props) => {
    return (
        <StarsWrapper>
            <ScoreInStars score={props.score}></ScoreInStars>
        </StarsWrapper>
    );
};

export default Stars;
