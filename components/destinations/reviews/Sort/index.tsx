// Tools
import { useState } from "react";
import { useRouter } from "next/router";
// Types
import type { Order, ScoreType } from "@/@types/SortReviews";
import type { FunctionComponent, ChangeEvent } from "react";
// Other components
import RecordsInTotal from "./RecordsInTotal";
// Material UI Icons
import SortByAlpha from "@mui/icons-material/SortByAlpha";
import Star from "@mui/icons-material/Star";
// Styled components
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";
import FlexBox from "@/components/_utils/styled/FlexBox";

interface SortProps {
    refreshData: (page: number) => Promise<any>;
    recordsInTotal: number | false;
    reviewsAreLoading: boolean;
}

const Sort: FunctionComponent<SortProps> = (props) => {
    const [order, setOrder] = useState<Order>("newest");
    const [type, setType] = useState<ScoreType>("all");

    const router = useRouter();

    const setSelectValue = async (e: ChangeEvent<HTMLInputElement>, property: "order" | "type") => {
        const { value } = e.target;

        if (property === "order") {
            setOrder(value as Order);
            router.query.order = value;
        } else if (property == "type") {
            setType(value as ScoreType);
            router.query.type = value;
        }

        await props.refreshData(1);
    };

    return (
        <FlexBox sx={{ my: "50px" }} vertical="center" horizontal="between">
            <FlexBox>
                <SelectWithIcon
                    value={order}
                    onChange={(e) => setSelectValue(e as any, "order")}
                    options={[
                        { label: "Newest", value: "newest" },
                        { label: "Oldest", value: "oldest" },
                        { label: "Best score", value: "best" },
                        { label: "Worst score", value: "worst" },
                    ]}
                    sx={{ mr: "10px" }}
                    icon={<SortByAlpha />}
                ></SelectWithIcon>
                <SelectWithIcon
                    value={type}
                    onChange={(e) => setSelectValue(e as any, "type")}
                    options={[
                        { label: "All types", value: "all" },
                        { label: "Positive", value: "POSITIVE" },
                        { label: "Negative", value: "NEGATIVE" },
                        { label: "Mixed", value: "MIXED" },
                    ]}
                    icon={<Star />}
                ></SelectWithIcon>
            </FlexBox>

            {(() => {
                if (props.recordsInTotal && !props.reviewsAreLoading) {
                    return <RecordsInTotal recordsInTotal={props.recordsInTotal}></RecordsInTotal>;
                }
            })()}
        </FlexBox>
    );
};

export default Sort;
