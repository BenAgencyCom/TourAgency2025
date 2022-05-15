// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Skeleton from "@mui/material/Skeleton";
// Other components
import ScoreInStars from "@/components/_utils/ScoreInStars";

interface StarsProps {
    score?: number;
}

const Stars: FunctionComponent<StarsProps> = (props) => {
    return (
        <div className="stars-wrapper">
            {(() => {
                if (props.score) return <ScoreInStars score={props.score}></ScoreInStars>;
                else return <Skeleton variant="rectangular" sx={{ width: "250px", height: "40px" }}></Skeleton>;
            })()}
        </div>
    );
};

export default Stars;
