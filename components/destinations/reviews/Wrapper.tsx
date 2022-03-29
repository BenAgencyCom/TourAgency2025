// Tools
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Types
import type { FunctionComponent } from "react";
import type { Destination } from "@/@types/pages/destinations/Reviews";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { ReviewsCallResponse, Review, PointsDistribution, Statistics } from "@/@types/pages/api/ReviewsAPI";
// Material UI Components
import Box from "@mui/material/Box";
// Other components
import Landing from "./Landing";
// Styled components
import Loading from "@/components/_utils/Loading";
const Wrapper = styled(Box)(({ theme }) => ({
    maxWidth: "1450px",
    width: "100vw",
    margin: "100px auto 0 auto",
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
    }, [page, props.destination, router]);

    return (
        <Wrapper>
            {(() => {
                if (!statistics || !pointsDistribution || !paginationProperties) {
                    return <Loading></Loading>;
                } else {
                    return (
                        <Landing
                            destination={props.destination} //
                            statistics={statistics}
                            pointsDistribution={pointsDistribution}
                        ></Landing>
                    );
                }
            })()}
        </Wrapper>
    );
};

export default Content;
