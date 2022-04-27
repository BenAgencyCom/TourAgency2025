// Types
import type { FunctionComponent } from "react";
import type { Continent } from "@/@types/SortReviews";
import type { SelectProps } from "@mui/material/Select";
// Material UI Icons
import Public from "@mui/icons-material/Public";
// Styled components
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";

const SelectContinent: FunctionComponent<SelectProps> = (props) => (
    <SelectWithIcon
        defaultValue="all"
        options={
            [
                { label: "All continents", value: "all" },
                { label: "Europe", value: "Europe" },
                { label: "North America", value: "North_America" },
                { label: "South America", value: "South_America" },
                { label: "Asia", value: "Asia" },
                { label: "Australia", value: "Australia_Oceania" },
                { label: "Africa", value: "Africa" },
            ] as { label: string; value: Continent }[]
        }
        sx={{ mr: "10px", width: "270px" }}
        icon={<Public />}
        {...props}
    ></SelectWithIcon>
);

export default SelectContinent;
