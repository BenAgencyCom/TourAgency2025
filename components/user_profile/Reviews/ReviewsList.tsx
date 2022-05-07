// Tools
import dynamic from "next/dynamic";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { LandmarkReview, DestinationReview } from "@/@types/pages/UserProfile";
// Other components
const SingleLandmarkReview = dynamic(() => import("@/components/_utils/SingleLandmark"), { loading: () => <Loading /> });
const SingleDestinationReview = dynamic(() => import("@/components/user_profile/Reviews/DestinationReview"), { loading: () => <Loading /> });
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import Loading from "@/components/_utils/Loading";

const Wrapper = styled(FlexBox)(({ theme }) => ({
    position: "relative",
    minHeight: "1000px",
    flexWrap: "wrap",
    alignItems: "flex-start",
    margin: "0 0 60px 0 ",
}));

interface ReviewsListProps {
    reviews: LandmarkReview[] | DestinationReview[];
    fetchedReviewsType: "landmark" | "destination" | null;
    somethingIsLoading: boolean;
}

const ReviewsList: FunctionComponent<ReviewsListProps> = (props) => {
    const { fetchedReviewsType, somethingIsLoading, reviews } = props;
    return (
        <Wrapper>
            {(() => {
                if (somethingIsLoading) {
                    return <Loading sx={{ top: "10%" }}></Loading>;
                } else {
                    if (fetchedReviewsType === "landmark") {
                        return (reviews as LandmarkReview[]).map((review, index) => {
                            return (
                                <SingleLandmarkReview
                                    data={review.landmark} //
                                    key={review.landmark.slug}
                                    sx={{ mb: "20px", ml: index % 3 ? "20px" : 0 }}
                                    userReview={{
                                        points: review.points,
                                        type: review.type,
                                    }}
                                ></SingleLandmarkReview>
                            );
                        });
                    } else if (fetchedReviewsType === "destination") {
                        return (reviews as DestinationReview[]).map((review, index) => {
                            return (
                                <SingleDestinationReview
                                    data={review} //
                                    key={review.destination.slug}
                                    sx={{ mb: "20px", ml: index % 2 ? "20px" : 0 }}
                                ></SingleDestinationReview>
                            );
                        });
                    }
                }
            })()}
        </Wrapper>
    );
};

export default ReviewsList;
