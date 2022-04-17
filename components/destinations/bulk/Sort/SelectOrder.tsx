// Types
import type { FunctionComponent } from "react";
import type { Order } from "@/@types/SortReviews";
import type { SelectProps } from "@mui/material/Select";
// Material UI Icons
import SortByAlpha from "@mui/icons-material/SortByAlpha";
// Styled components
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";

const SelectOrder: FunctionComponent<SelectProps> = (props) => (
    <SelectWithIcon
        options={
            [
                { label: "Newest", value: "newest" },
                { label: "Oldest", value: "oldest" },
                { label: "Biggest", value: "biggest" },
                { label: "Smallest", value: "smallest" },
            ] as { label: string; value: Order }[]
        }
        icon={<SortByAlpha />}
        {...props}
    ></SelectWithIcon>
);

export default SelectOrder;
