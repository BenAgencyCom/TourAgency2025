// Tools
import { styled, alpha } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Skeleton from "@mui/material/Skeleton";
// Other components
import ScoreInStars from "@/components/_utils/ScoreInStars";
// Styled components
const StarsWrapper = styled("div")(({ theme }) => ({
    "&.there-are-no-results": {
        svg: {
            color: `${alpha(theme.palette.text.primary, 0.2)} !important`,
        },
    },
}));

interface StarsProps {
    score?: number;
    thereAreNoResults?: boolean;
}

const Stars: FunctionComponent<StarsProps> = (props) => {
    return (
        <StarsWrapper
            className={[
                "stars-wrapper", //
                props.thereAreNoResults ? "there-are-no-results" : "",
            ].join(" ")}
        >
            {(() => {
                if (props.thereAreNoResults) return <ScoreInStars score={0} />;
                else if (props.score) return <ScoreInStars score={props.score} />;
                else return <Skeleton variant="rectangular" sx={{ width: "250px", height: "40px" }}></Skeleton>;
            })()}
        </StarsWrapper>
    );
};

export default Stars;
