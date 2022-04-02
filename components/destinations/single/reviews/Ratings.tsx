// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Other components
import Field from "@/components/destinations/single/reviews/Field";
import ScoreInStars from "@/components/_utils/ScoreInStars";
// Styled components
const StarsWrapper = styled("div")(({ theme }) => ({
    svg: {
        fontSize: "2rem",
    },
}));
const Rating = styled("h2")(({ theme }) => ({
    fontWeight: 900,
    letterSpacing: "-2px",
    fontSize: "4.5rem !important",
    color: theme.palette.primary.main,
    marginBottom: "10px",
    margin: 0,
}));

interface RatingsProps {
    ratings: number;
    totalReviews: number;
}
const Ratings: FunctionComponent<RatingsProps> = (props) => {
    return (
        <Field>
            <StarsWrapper>
                <ScoreInStars score={props.ratings}></ScoreInStars>
            </StarsWrapper>
            <Rating>{`${Math.floor(props.ratings * 10)}/100`}</Rating>
            <span>
                Based on <strong>{props.totalReviews}</strong> reviews
            </span>
        </Field>
    );
};

export default Ratings;
