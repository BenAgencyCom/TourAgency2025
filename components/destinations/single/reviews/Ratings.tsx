// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// Other components
import Field from "@/components/destinations/single/reviews/Field";
// Material UI Icons
import Star from "@mui/icons-material/Star";
import StarHalf from "@mui/icons-material/StarHalf";
import StarBorder from "@mui/icons-material/StarBorder";
// Styled components
const StarsWrapper = styled(Box)(({ theme }) => ({
    svg: {
        fontSize: "3rem",
    },
}));
const Rating = styled(Typography)(({ theme }) => ({
    fontWeight: 900,
    letterSpacing: "-2px",
    fontSize: "4.5rem !important",
    color: theme.palette.primary.main,
    marginBottom: "10px",
}));

interface RatingsProps {
    ratings: number;
    totalReviews: number;
}
const Ratings: FunctionComponent<RatingsProps> = (props) => {
    const amountOfStars = Math.floor(props.ratings / 2);
    const applyHalfStar = props.ratings % 1 > 0.5;
    const amountOfRemainingEmtpyStars = applyHalfStar ? 4 - amountOfStars : 5 - amountOfStars;
    const stars: ReactNode[] = [];

    for (let i = 0; i < amountOfStars; i++) stars.push(<Star key={stars.length}></Star>);
    if (applyHalfStar) stars.push(<StarHalf key={stars.length}></StarHalf>);
    for (let i = 0; i < amountOfRemainingEmtpyStars; i++) stars.push(<StarBorder key={stars.length}></StarBorder>);

    return (
        <Field>
            <StarsWrapper>{stars}</StarsWrapper>
            <Rating variant="h2">{`${Math.floor(props.ratings * 10)}/100`}</Rating>
            <span>
                Based on <strong>{props.totalReviews}</strong> reviews
            </span>
        </Field>
    );
};

export default Ratings;
