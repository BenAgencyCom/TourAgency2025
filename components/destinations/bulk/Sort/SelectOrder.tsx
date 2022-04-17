// Types
import type { FunctionComponent } from "react";
import type { Order } from "@/@types/SortReviews";
// Material UI Icons
import SortByAlpha from "@mui/icons-material/SortByAlpha";
// Styled components
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";

interface SelectOrderProps {
    value: Order;
    onChange(e: any): void;
}

const SelectOrder: FunctionComponent<SelectOrderProps> = (props) => (
    <SelectWithIcon
        value={props.value}
        onChange={props.onChange}
        options={
            [
                { label: "Newest", value: "newest" },
                { label: "Oldest", value: "oldest" },
                { label: "Biggest", value: "biggest" },
                { label: "Smallest", value: "smallest" },
            ] as { label: string; value: Order }[]
        }
        icon={<SortByAlpha />}
    ></SelectWithIcon>
);

export default SelectOrder;
