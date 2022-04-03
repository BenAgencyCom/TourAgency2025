// Tools
import { useState, useEffect } from "react";
import stated from "@/utils/client/stated";
import { useRouter } from "next/router";
// Types
import type { FunctionComponent } from "react";
import type { ReviewType } from "@prisma/client";

// Styled components
import Select from "./StyledSelect";
import FlexBox from "@/components/_utils/styled/FlexBox";

type Order = "newest" | "oldest" | "best" | "worst";
interface SortProps {
    refreshData: () => Promise<void>;
}

const Sort: FunctionComponent<SortProps> = (props) => {
    const [order, setOrder] = useState<Order>("newest");
    const [type, setType] = useState<ReviewType | "all">("all");

    const router = useRouter();

    useEffect(() => {
        router.query.order = order;
        router.query.type = type;

        props.refreshData();
    }, [order, type, router.query, props]);

    return (
        <FlexBox sx={{ mb: "20px" }}>
            <Select
                variable={stated(order, setOrder)} //
                options={[
                    { label: "Newest", value: "newest" },
                    { label: "Oldest", value: "oldest" },
                    { label: "Best score", value: "best" },
                    { label: "Worst score", value: "worst" },
                ]}
                sx={{ mr: "10px" }}
            ></Select>
            <Select
                variable={stated(type, setType)} //
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
