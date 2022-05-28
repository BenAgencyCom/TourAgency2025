// Tools
import { useRouter } from "next/router";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Material UI Icons
import PushPin from "@mui/icons-material/PushPin";
// Other components
import SingleReview from "@/components/_utils/SingleReview";
// Styled components
import SingleReviewSkeletonLoading from "@/components/_utils/SingleReview/SkeletonLoading";

const PinnedReviewWrapper = styled("div")(({ theme }) => ({
    background: theme.palette.background.paper,
    marginBottom: "100px",
    padding: "40px 20px 20px 20px",
    borderRadius: "5px",
    position: "relative",
    "svg.background-pin-icon": {
        position: "absolute",
        bottom: "-20px",
        right: "-60px",
        fontSize: "23rem",
        opacity: 0.1,
    },
    h3: {
        marginBottom: "20px",
    },
    "div.single-review, h3": {
        position: "relative",
        zIndex: "2",
    },
    ["@media (max-width:600px)"]: {
        padding: "40px 0px 20px 0px",
    },
}));

interface PinnedReviewProps {
    review: Review | null;
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
                <PinnedReviewWrapper>
                    <PushPin className="background-pin-icon"></PushPin>
                    <SingleReview review={props.review} sx={{ m: 0 }}></SingleReview>
                </PinnedReviewWrapper>
            )}
        </>
    );
};

export default PinnedReview;
