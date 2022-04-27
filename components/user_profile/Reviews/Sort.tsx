// Tools
import { useState } from "react";
import { useRouter } from "next/router";
import { UpdateCurrentURLsQueries } from "../_utils/URLBuilder";
import { getDefaultScoreType, getDefaultOrder } from "@/utils/client/reviewsSortingHelpers";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StagedDataField";
import type { Order, ScoreType, ReviewingType } from "@/@types/SortReviews";
// Material UI Icons
import SortByAlpha from "@mui/icons-material/SortByAlpha";
import Star from "@mui/icons-material/Star";
import Flag from "@mui/icons-material/Flag";
// Styled components
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";

interface ReviewsWrapperProps {
    reviewingType: StatedDataField<ReviewingType>;
    refreshData: () => Promise<any>;
    disabled: boolean;
    thereIsNoDataAtAll: boolean;
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
                disabled={props.thereIsNoDataAtAll}
                onChange={(e) => setSelectValue(e as any, "reviewingType")}
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
                disabled={props.disabled}
                onChange={(e) => setSelectValue(e as any, "order")}
                defaultValue="newest"
                options={
                    [
                        { label: "Newest", value: "newest" },
                        { label: "Oldest", value: "oldest" },
                        { label: "Best score", value: "best" },
                        { label: "Worst score", value: "worst" },
                    ] as { label: string; value: Order }[]
                }
                sx={{ mr: "10px", width: "230px" }}
                icon={<SortByAlpha />}
            ></SelectWithIcon>
            <SelectWithIcon
                value={scoreType}
                disabled={props.disabled}
                onChange={(e) => setSelectValue(e as any, "scoreType")}
                defaultValue="all"
                options={
                    [
                        { label: "All types", value: "all" },
                        { label: "Positive", value: "POSITIVE" },
                        { label: "Negative", value: "NEGATIVE" },
                        { label: "Mixed", value: "MIXED" },
                    ] as { label: string; value: ScoreType }[]
                }
                icon={<Star />}
                sx={{ width: "230px" }}
            ></SelectWithIcon>
        </>
    );
};

export default ReviewsWrapper;
