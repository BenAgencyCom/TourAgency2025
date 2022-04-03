// Tools
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { CreateRequestURL } from "../_utils/URLBuilder";
// Types
import type { ChosenOrder, ChosenType } from "../@types";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
import type { FunctionComponent, Dispatch, SetStateAction, ChangeEvent } from "react";
// Styled components
import Select from "./StyledSelect";
import FlexBox from "@/components/_utils/styled/FlexBox";

interface SortProps {
    destinationId: string;
    perPage: number;
    setReviews: Dispatch<SetStateAction<Review[]>>;
    setPaginationProperties: Dispatch<SetStateAction<PaginationProperties | null>>;
    setReviewsAreLoading: Dispatch<SetStateAction<boolean>>;
}

const Sort: FunctionComponent<SortProps> = (props) => {
    const [order, setOrder] = useState<ChosenOrder>("newest");
    const [type, setType] = useState<ChosenType>("all");

    const router = useRouter();

    const refreshData = async () => {
        props.setReviewsAreLoading(true);
        router.query.page = `1`;

        const URL = CreateRequestURL({
            destinationId: props.destinationId,
            perPage: props.perPage,
            page: 1,
            type: router.query.type,
            order: router.query.order,
        });

        const { data } = await axios.get(URL);

        props.setPaginationProperties(data.pagination);
        props.setReviews(data.reviews);
        props.setReviewsAreLoading(false);
    };

    const setSelectValue = async (e: ChangeEvent<HTMLInputElement>, property: "order" | "type") => {
        const { value } = e.target;

        if (property === "order") {
            setOrder(value as ChosenOrder);
            router.query.order = value;
        } else if (property == "type") {
            setType(value as ChosenType);
            router.query.type = value;
        }

        await refreshData();
    };

    return (
        <FlexBox sx={{ my: "50px" }}>
            <Select
                value={order}
                onChange={(e) => setSelectValue(e, "order")}
                options={[
                    { label: "Newest", value: "newest" },
                    { label: "Oldest", value: "oldest" },
                    { label: "Best score", value: "best" },
                    { label: "Worst score", value: "worst" },
                ]}
                sx={{ mr: "10px" }}
            ></Select>
            <Select
                value={type}
                onChange={(e) => setSelectValue(e, "type")}
                options={[
                    { label: "All types", value: "all" },
                    { label: "Positive", value: "POSITIVE" },
                    { label: "Negative", value: "NEGATIVE" },
                    { label: "Mixed", value: "MIXED" },
                ]}
            ></Select>
        </FlexBox>
    );
};

export default Sort;
