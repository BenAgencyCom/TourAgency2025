// Tools
import axios from "axios";
import { useState } from "react";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { LandmarkReview, DestinationReview } from "@/@types/pages/UserProfile";
// Material UI Icons
import Star from "@mui/icons-material/Star";
import Flag from "@mui/icons-material/Flag";
// Other components
import Header from "./Header";
import ReviewsList from "./ReviewsList";
import ThereAreNoResults from "@/components/_utils/ThereAreNoResults";
import URLQueriesManager from "@/components/_utils/URLQueriesManager";
// Styled Components
import DestinationReviewSkeletonLoading from "./DestinationReview/SkeletonLoading";
import LandmarkReviewSkeletonLoading from "@/components/_utils/SingleLandmark/SkeletonLoading";

const SkeletonExtraSpace = styled("span")(({ theme }) => ({
    height: "100px",
    width: "100%",
    ["@media (max-width:1000px)"]: {
        height: "60px",
    },
}));

const GeneralWrapper = styled("div")(({ theme }) => ({
    zIndex: "1",
    marginTop: "200px",
    position: "relative",
    paddingBottom: "100px",
    ["@media (max-width:1000px)"]: {
        marginTop: "100px",
    },
}));

const ReviewsWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
}));

interface ReviewsWrapperProps {
    userID: string;
    thereIsNoDataAtAll: boolean;
}

const BulkReviews: FunctionComponent<ReviewsWrapperProps> = (props) => {
    const router = useRouter();

    const [loading, setLoading] = useState<"landmark" | "destination" | false>("landmark");
    const [reviews, setReviews] = useState<LandmarkReview[] | DestinationReview[]>([]);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);
    const [fetchedReviewsType, setFetchedReviewsType] = useState<"landmark" | "destination" | null>(null);
    const [currentlyFetchingReviewsType, setCurrentlyFetchingReviewsType] = useState<"landmark" | "destination" | null>(null);

    const queryForData = async (urlQueries: string) => {
        const reviewingType = (urlQueries.split("type=") as any)[1].split("&")[0] as "landmark" | "destination";
        const PER_PAGE = reviewingType === "destination" ? 4 : 9;
        setCurrentlyFetchingReviewsType(reviewingType);

        try {
            setLoading(reviewingType);
            const res = await axios.get(`/api/user/${props.userID}/reviews${urlQueries}&perPage=${PER_PAGE}`);
            if (res.data) {
                setPaginationProperties(res.data.pagination ?? null);
                setPaginationProperties(res.data.pagination ?? null);
                setReviews(res.data.reviews ?? []);
                setFetchedReviewsType(reviewingType);
                setLoading(false);
            }
        } catch (e: unknown) {
            router.push("/500");
        }
    };

    return (
        <GeneralWrapper>
            <Header background={`${"dasd"}s`} id="reviews-header">
                Reviews
            </Header>
            <URLQueriesManager
                queryForData={queryForData}
                disableEverything={props.thereIsNoDataAtAll}
                lineAnimationColor="paperDefault"
                extraOrderOptions={[
                    {
                        label: "Best score",
                        value: "best",
                        "data-compounded-value": "orderBy=points&sort=desc",
                    },
                    {
                        label: "Worst score",
                        value: "worst",
                        "data-compounded-value": "orderBy=points&sort=asc",
                    },
                ]}
                extraSelects={[
                    {
                        key: "type",
                        icon: <Flag />,
                        options: [
                            { label: "Landmarks", value: "landmark" },
                            { label: "Destinations", value: "destination" },
                        ],
                        defaultValue: "landmark",
                        sx: {
                            width: "230px",
                        },
                    },
                    {
                        key: "certianReviewType",
                        icon: <Star />,
                        options: [
                            { label: "All types", value: "all" },
                            { label: "Positive", value: "POSITIVE" },
                            { label: "Negative", value: "NEGATIVE" },
                            { label: "Mixed", value: "MIXED" },
                        ] as { label: string; value: ReviewType | "all" }[],
                        defaultValue: "all",
                        omitIfDeafult: true,
                        sx: {
                            width: "230px",
                        },
                    },
                ]}
                paginationProperties={
                    paginationProperties && !loading
                        ? {
                              ...paginationProperties,
                              idOfElementToScrollTo: "reviews-header",
                          }
                        : undefined
                }
            >
                <ReviewsWrapper>
                    {(() => {
                        if (loading) {
                            if (currentlyFetchingReviewsType === "destination") {
                                return (
                                    <>
                                        <SkeletonExtraSpace />
                                        <DestinationReviewSkeletonLoading sx={{ display: "none" }} />
                                        <DestinationReviewSkeletonLoading />
                                        <DestinationReviewSkeletonLoading />
                                        <DestinationReviewSkeletonLoading />
                                        <DestinationReviewSkeletonLoading />
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        <SkeletonExtraSpace />
                                        <LandmarkReviewSkeletonLoading sx={{ display: "none" }} />
                                        <LandmarkReviewSkeletonLoading sx={{ display: "none" }} />
                                        <LandmarkReviewSkeletonLoading />
                                        <LandmarkReviewSkeletonLoading />
                                        <LandmarkReviewSkeletonLoading />
                                        <LandmarkReviewSkeletonLoading />
                                        <LandmarkReviewSkeletonLoading />
                                        <LandmarkReviewSkeletonLoading />
                                        <LandmarkReviewSkeletonLoading />
                                        <LandmarkReviewSkeletonLoading />
                                        <LandmarkReviewSkeletonLoading />
                                    </>
                                );
                            }
                        } else {
                            if (props.thereIsNoDataAtAll || paginationProperties?.recordsInTotal === 0) {
                                return (
                                    <ThereAreNoResults
                                        header="There are no reviews" //
                                        moreInformation={[
                                            <span key="inf0">
                                                {(() => {
                                                    if (!props.thereIsNoDataAtAll)
                                                        return (
                                                            <span>
                                                                This particular user has not reviewed any <strong>{fetchedReviewsType}</strong> yet
                                                            </span>
                                                        );
                                                    else
                                                        return (
                                                            <span>
                                                                This particular user has not reviewed <strong>anything</strong> yet
                                                            </span>
                                                        );
                                                })()}
                                            </span>,
                                        ]}
                                    ></ThereAreNoResults>
                                );
                            } else {
                                return (
                                    <ReviewsList
                                        reviews={reviews} //
                                        fetchedReviewsType={fetchedReviewsType}
                                        somethingIsLoading={!props.thereIsNoDataAtAll && (loading || (fetchedReviewsType === null && paginationProperties === null))}
                                    ></ReviewsList>
                                );
                            }
                        }
                    })()}
                </ReviewsWrapper>
            </URLQueriesManager>
        </GeneralWrapper>
    );
};

export default BulkReviews;
