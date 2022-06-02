// Tools
import axios from "axios";
import { useState } from "react";
import stated from "@/utils/client/stated";
// Types
import type { FunctionComponent } from "react";
import type { Feedback } from "@prisma/client";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Other components
import ThumbsWithTooltips from "./ThumbsWithTooltips";
import ThumbsWithoutTooltips from "./ThumbsWithoutTooltips";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface LikesProps {
    feedback: Review["feedback"];
    reviewId: string;
    record: {
        id: string;
        type: "destination" | "landmark";
    };
}

const Likes: FunctionComponent<LikesProps> = (props) => {
    const { isAuthenticated } = useAppSelector((state) => state.authentication);

    const [amountOfLikes, setAmountOfLikes] = useState<number>(props.feedback.likes);
    const [amountOfDislikes, setAmountOfDislikes] = useState<number>(props.feedback.dislikes);
    const [authenticatedUserChoice, setAuthenticatedUserChoice] = useState<Feedback | null>(props.feedback.authenticatedUserChoice ?? null);

    const sendRequest = async (feedback: Feedback) => {
        if (!isAuthenticated) return;
        await axios.post(`/api/${props.record.type}/${props.record.id}/reviews/${props.reviewId}/feedback`, { feedback });
    };

    return (
        <FlexBox vertical="center">
            {(() => {
                if (isAuthenticated) {
                    return (
                        <>
                            <ThumbsWithTooltips
                                amountOfLikes={stated(amountOfLikes, setAmountOfLikes)}
                                amountOfDislikes={stated(amountOfDislikes, setAmountOfDislikes)}
                                authenticatedUserChoice={stated(authenticatedUserChoice, setAuthenticatedUserChoice)}
                                sendRequest={sendRequest}
                            ></ThumbsWithTooltips>
                        </>
                    );
                } else {
                    return (
                        <ThumbsWithoutTooltips
                            amountOfLikes={amountOfLikes} //
                            amountOfDislikes={amountOfDislikes}
                        />
                    );
                }
            })()}
        </FlexBox>
    );
};

export default Likes;
