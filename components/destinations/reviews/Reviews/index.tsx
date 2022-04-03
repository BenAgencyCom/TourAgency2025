// Tools
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Other components
import Sort from "./Sort";
import Pagination from "@/components/_utils/Pagination";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

interface ReviewsProps {
    reviews: Review[];
    paginationProperties: PaginationProperties;
    slug: string;
    refreshData: () => Promise<void>;
}

const Reviews: FunctionComponent<ReviewsProps> = (props) => {
    return (
        <FlexBox column horizontal="center" sx={{ mt: "50px" }}>
            <Sort refreshData={props.refreshData}> </Sort>
            <Pagination paginationProperties={props.paginationProperties}></Pagination>
        </FlexBox>
    );
};

export default Reviews;
