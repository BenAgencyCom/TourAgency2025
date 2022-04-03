// Tools
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Types
import type { FunctionComponent } from "react";
import type { Destination } from "@/@types/pages/destinations/Reviews";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { ReviewsCallResponse, Review, PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";
// Other components
import Landing from "./Landing";
import Reviews from "./Reviews";
// Styled components
import Loading from "@/components/_utils/Loading";
const Wrapper = styled("div")(({ theme }) => ({
    maxWidth: "1450px",
    width: "calc(100vw - 40px)",
    margin: "100px auto 0 auto",
    color: theme.palette.text.primary,
}));

interface ContentParams {
    destination: Destination;
}
const Content: FunctionComponent<ContentParams> = (props) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);
    const [pointsDistribution, setPointsDistribution] = useState<PointsDistribution | null>(null);
    const [statistics, setStatistics] = useState<Statistics | null>(null);

    const router = useRouter();
    const page = router.query.page ? Number(router.query.page) : 1;
    const perPage = 20;

    const refreshData = async () => {
        console.log("refreshing");
        console.log(router.query);
    };

    useEffect(() => {
        let isMounted = true;
        fetch(`/api/destination/${props.destination.id}/reviews?page=${page}&perPage=${perPage}&applyPointsDistribution=true`)
            .then((res) => res.json())
            .then((res: ReviewsCallResponse) => {
                if (isMounted) {
                    setPaginationProperties(res.pagination as PaginationProperties);
                    setReviews(res.reviews);
                    setPointsDistribution(res.pointsDistribution as PointsDistribution);
                    setStatistics(res.statistics as Statistics);
                }
            })
            .catch(() => {
                router.push("/404");
            });
        return () => {
            isMounted = false;
        };
    }, [page, props.destination, router, router.query]);

    return (
        <Wrapper>
            {(() => {
                if (!statistics || !pointsDistribution || !paginationProperties) {
                    return <Loading></Loading>;
                } else {
                    return (
                        <>
                            <Landing
                                destination={props.destination} //
                                statistics={statistics}
                                pointsDistribution={pointsDistribution}
                            ></Landing>

                            <Reviews
                                reviews={reviews} //
                                paginationProperties={paginationProperties}
                                slug={props.destination.slug}
                                refreshData={refreshData}
                            ></Reviews>
                        </>
                    );
                }
            })()}
        </Wrapper>
    );
};

export default Content;
