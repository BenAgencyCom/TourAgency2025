// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
// Other Components
import ReviewScore from "@/components/_utils/ReviewScore";

interface ReviewProps {
    type: ReviewType;
    points: number;
}

const Review: FunctionComponent<ReviewProps> = (props) => {
    return (
        <ReviewScore
            type={props.type}
            points={props.points}
            sx={{
                position: "absolute", //
                top: "20px",
                left: "20px",
                zIndex: "10",
                fontSize: "3rem",
                width: "90px",
                height: "90px",
                borderRadius: "5px",
            }}
        ></ReviewScore>
    );
};

export default Review;
