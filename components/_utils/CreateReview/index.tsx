// Tools
import { useMemo } from "react";
import { styled, alpha } from "@mui/system";
import { CreateReviewContext } from "./context";
import getColorBasedOnScore from "@/utils/client/getColorBasedOnScore";
// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other components
import AddTags from "./AddTags/index";
import SelectScore from "./SelectScore";
import ReviewContent from "./ReviewContent";
import SendRequestButton from "./SendRequestButton";
// Styled components
import BackgroundHeader from "@/components/_utils/styled/BackgroundHeader";

const CreateReviewWrapper = styled("div")(({ theme }) => ({
    width: "100%",
    padding: "40px 20px 20px 20px",
    background: alpha("#fff", 0.3),
    borderRadius: "5px",
    marginBottom: "60px",
    h3: {
        position: "relative",
        marginBottom: "30px",
    },
}));

interface CreateReviewProps {
    reviewToModify: Review | null;
    scoreInt: StatedDataField<number>;
    scoreFloat: StatedDataField<number>;
    reviewContent: StatedDataField<string>;
    tags: StatedDataField<string[]>;
}

const CreateReview: FunctionComponent<CreateReviewProps> = (props) => {
    const { scoreInt, scoreFloat, reviewContent, tags, reviewToModify } = props;

    const estimatedReviewType = useMemo<ReviewType>(() => {
        if (scoreInt.value >= 7) return "POSITIVE";
        else if (scoreInt.value >= 4) return "MIXED";
        return "NEGATIVE";
    }, [scoreInt]);

    const estimatedReviewColor = useMemo<string>(() => {
        return getColorBasedOnScore(estimatedReviewType);
    }, [estimatedReviewType]);
    //

    return (
        <CreateReviewContext.Provider
            value={{
                estimatedReviewColor,
                estimatedReviewType,
            }}
        >
            <CreateReviewWrapper>
                <Typography variant="h3" sx={{ userSelect: "none" }}>
                    Share your opinion
                    <BackgroundHeader fontSize="5rem">Ratings</BackgroundHeader>
                </Typography>
                {/*  */}
                <SelectScore
                    scoreInt={scoreInt} //
                    scoreFloat={scoreFloat}
                ></SelectScore>
                {/*  */}
                <AddTags tags={tags} />
                {/*  */}
                <ReviewContent reviewContent={reviewContent} />
                {/*  */}
                <SendRequestButton
                    tags={tags.value} //
                    reviewContent={reviewContent.value}
                    reviewToModify={reviewToModify}
                    scoreInt={scoreInt.value}
                    scoreFloat={scoreFloat.value}
                />
            </CreateReviewWrapper>
        </CreateReviewContext.Provider>
    );
};

export default CreateReview;
