// Material UI Icons
import Star from "@mui/icons-material/Star";
import StarHalf from "@mui/icons-material/StarHalf";
import StarBorder from "@mui/icons-material/StarBorder";
// Types
import type { FunctionComponent, ReactNode } from "react";

interface ScoreInStarsProps {
    score: number;
}
/**
 * ### Params:
 * - `score`- **REQUIRE** value based on which stars will be displayed
 */
const ScoreInStars: FunctionComponent<ScoreInStarsProps> = (props) => {
    const score = Math.min(props.score + 0.5, 10);
    const stars: ReactNode[] = [];
    const amountOfStars = Math.floor(score / 2);
    const applyHalfStar = Number(String(score).split(".")[1]) > 5;
    const amountOfRemainingEmtpyStars = applyHalfStar ? 4 - amountOfStars : 5 - amountOfStars;

    for (let i = 0; i < amountOfStars; i++) stars.push(<Star key={stars.length}></Star>);
    if (applyHalfStar) stars.push(<StarHalf key={stars.length}></StarHalf>);
    for (let i = 0; i < amountOfRemainingEmtpyStars; i++) stars.push(<StarBorder key={stars.length}></StarBorder>);

    return <>{stars}</>;
};

export default ScoreInStars;
