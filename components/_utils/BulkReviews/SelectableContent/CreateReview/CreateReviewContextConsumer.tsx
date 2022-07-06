// Tools
import RWD from "./RWD";
import { useRef } from "react";
import { styled, alpha } from "@mui/system";
import useCreateReviewContext from "@/components/_utils/BulkReviews/SelectableContent/CreateReview/hooks/useCreateReviewContext";
// Types
import type { FunctionComponent } from "react";
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
    ...(RWD as any),
}));

interface CreateReviewContextConsumerProps {
    showAuthenticatedUserReview: () => void;
}

const CreateReviewContextConsumer: FunctionComponent<CreateReviewContextConsumerProps> = (props) => {
    const { scoreInt, scoreFloat, reviewContent, tags } = useCreateReviewContext();
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const showAuthenticatedUserReview = () => {
        scrollTo({
            top: wrapperRef.current ? wrapperRef.current.offsetTop - 100 : 0,
            behavior: "smooth",
        });
        props.showAuthenticatedUserReview();
    };

    return (
        <CreateReviewWrapper ref={wrapperRef}>
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
            <SendRequestButton showAuthenticatedUserReview={showAuthenticatedUserReview} />
        </CreateReviewWrapper>
    );
};

export default CreateReviewContextConsumer;
