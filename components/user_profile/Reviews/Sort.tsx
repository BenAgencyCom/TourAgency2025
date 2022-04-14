// Tools
import { useState } from "react";
import { useRouter } from "next/router";
import { UpdateCurrentURLsQueries } from "../_utils/URLBuilder";
import { getDefaultScoreType, getDefaultOrder } from "@/utils/client/reviewsSortingHelpers";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StagedDataField";
import type { Order, ScoreType, ReviewingType } from "@/@types/SortReviews";
// Material UI Components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// Material UI Icons
import SortByAlpha from "@mui/icons-material/SortByAlpha";
import Star from "@mui/icons-material/Star";
import Flag from "@mui/icons-material/Flag";
// Styled components
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";

interface ReviewsWrapperProps {
    reviewingType: StatedDataField<ReviewingType>;
    refreshData: () => Promise<any>;
}

const ReviewsWrapper: FunctionComponent<ReviewsWrapperProps> = (props) => {
    const router = useRouter();

    const [order, setOrder] = useState<Order>(getDefaultOrder(router.query.order));
    const [scoreType, setScoreType] = useState<ScoreType>(getDefaultScoreType(router.query.scoreType));

    type SelectingProperty = "order" | "scoreType" | "reviewingType";

    const setSelectValue = async (e: ChangeEvent<HTMLInputElement>, property: SelectingProperty) => {
        const { value } = e.target;
        // Update value
        if (property === "order") setOrder(value as Order);
        else if (property === "scoreType") setScoreType(value as ScoreType);
        else props.reviewingType.setValue(value as ReviewingType);
        // Update URL queries
        router.query.page = `1`;
        router.query[property] = value;
        UpdateCurrentURLsQueries(router);
        await props.refreshData();
    };

    return (
        <>
            <SelectWithIcon
                value={props.reviewingType.value}
                onChange={(e) => setSelectValue(e, "reviewingType")}
                options={
                    [
                        { label: "Landmarks", value: "landmark" },
                        { label: "Destinations", value: "destination" },
                    ] as { label: string; value: ReviewingType }[]
                }
                sx={{ mr: "10px" }}
                icon={<Flag />}
            ></SelectWithIcon>{" "}
            <SelectWithIcon
                value={order}
                onChange={(e) => setSelectValue(e, "order")}
                options={
                    [
                        { label: "Newest", value: "newest" },
                        { label: "Oldest", value: "oldest" },
                        { label: "Best score", value: "best" },
                        { label: "Worst score", value: "worst" },
                    ] as { label: string; value: Order }[]
                }
                sx={{ mr: "10px" }}
                icon={<SortByAlpha />}
            ></SelectWithIcon>
            <SelectWithIcon
                value={scoreType}
                onChange={(e) => setSelectValue(e, "scoreType")}
                options={
                    [
                        { label: "All types", value: "all" },
                        { label: "Positive", value: "POSITIVE" },
                        { label: "Negative", value: "NEGATIVE" },
                        { label: "Mixed", value: "MIXED" },
                    ] as { label: string; value: ScoreType }[]
                }
                icon={<Star />}
            ></SelectWithIcon>
        </>
    );
};

export default ReviewsWrapper;
