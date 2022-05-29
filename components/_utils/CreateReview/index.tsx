// Tools
import { useState, useMemo } from "react";
import stated from "@/utils/client/stated";
import { styled, alpha } from "@mui/system";
import { CreateReviewContext } from "./context";
import getColorBasedOnScore from "@/utils/client/getColorBasedOnScore";
// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
// Material UI Components
import Typography from "@mui/material/Typography";
// Other components
import AddTags from "./AddTags/index";
import SelectScore from "./SelectScore";
import ReviewContent from "./ReviewContent";
import SendRequestButton from "./SendRequestButton";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";
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
    //
}

const CreateReview: FunctionComponent<CreateReviewProps> = (props) => {
    //
    const [scoreInt, setScoreInt] = useState<number>(0);
    const [scoreFloat, setScoreFloat] = useState<number>(0);
    const [reviewContent, setReviewContent] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    //
    const estimatedReviewType = useMemo<ReviewType>(() => {
        if (scoreInt >= 7) return "POSITIVE";
        else if (scoreInt >= 4) return "MIXED";
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
                    scoreInt={stated(scoreInt, setScoreInt)} //
                    scoreFloat={stated(scoreFloat, setScoreFloat)}
                ></SelectScore>
                {/*  */}
                <AddTags tags={stated(tags, setTags)} />
                {/*  */}
                <ReviewContent reviewContent={stated(reviewContent, setReviewContent)} />
                {/*  */}
                <SendRequestButton
                    tags={tags} //
                    reviewContent={reviewContent}
                />
            </CreateReviewWrapper>
        </CreateReviewContext.Provider>
    );
};

export default CreateReview;
