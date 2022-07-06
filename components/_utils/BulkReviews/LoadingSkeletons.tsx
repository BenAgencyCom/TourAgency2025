// Types
import type { FunctionComponent } from "react";
// Styled components
import SingleReviewSkeletonLoading from "@/components/_utils/SingleReview/SkeletonLoading";

const LoadingSkeletons: FunctionComponent = () => {
    return (
        <>
            <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
            <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
            <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
            <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
            <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
            <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
            <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
            <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
            <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
            <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
            <SingleReviewSkeletonLoading></SingleReviewSkeletonLoading>
        </>
    );
};

export default LoadingSkeletons;
