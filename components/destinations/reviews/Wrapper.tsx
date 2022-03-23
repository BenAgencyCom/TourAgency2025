// Tools
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// Types
import type { FunctionComponent } from "react";
import type { Destination } from "@/@types/pages/destinations/Reviews";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { ReviewsCallResponse, Review } from "@/@types/pages/api/ReviewsAPI";
// Material UI Components
import Container from "@mui/material/Container";
// Styled components
import Loading from "@/components/_utils/Loading";
const Wrapper = styled(Container)(({ theme }) => ({
    marginTop: "100px",
    background: "red",
}));

interface ContentParams {
    destination: Destination;
}
const Content: FunctionComponent<ContentParams> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationProperties, setPaginationProperties] = useState<PaginationProperties | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);

    const router = useRouter();
    const page = router.query.page ? Number(router.query.page) : 1;
    const perPage = 20;

    useEffect(() => {
        let isMounted = true;
        fetch(`/api/destination/${props.destination.id}/reviews?page=${page}&perPage=${perPage}`)
            .then((res) => res.json())
            .then((res: ReviewsCallResponse) => {
                if (isMounted) {
                    setLoading(false);
                    setPaginationProperties(res.pagination as PaginationProperties);
                    setReviews(res.reviews);
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
            <span>REVIEWS</span>
            <span>{JSON.stringify(props)}</span>

            {(() => {
                if (loading) {
                    return <Loading></Loading>;
                } else {
                    return (
                        <>
                            <hr />
                            <span>{JSON.stringify(paginationProperties)}</span>
                            <hr />
                            <span>{JSON.stringify(reviews)}</span>
                        </>
                    );
                }
            })()}
        </Wrapper>
    );
};

export default Content;
