// Tools
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Other components
import SingleReview from "@/components/_utils/SingleReview";
// Styled components
import SingleReviewSkeletonLoading from "@/components/_utils/SingleReview/SkeletonLoading";

interface PinnedReviewProps {
    review: Review | null;
    record: {
        id: string;
        type: "destination" | "landmark";
    };
}

const PinnedReview: FunctionComponent<PinnedReviewProps> = (props) => {
    const router = useRouter();
    const [canBeLoaded, setCanBeLoaded] = useState<boolean>(false);
    useEffect(() => {
        if (router.query.pinnedReviewId) {
            setCanBeLoaded(true);
        }
    }, [router.query]);

    return (
        <>
            {props.review === null && canBeLoaded && <SingleReviewSkeletonLoading />}
            {props.review && (
                <SingleReview
                    review={props.review} //
                    sx={{ mb: "100px" }}
                    record={props.record}
                    pinned
                ></SingleReview>
            )}
        </>
    );
};

export default PinnedReview;
