// Types
import type { FunctionComponent } from "react";
import type { Continent } from "@/@types/SortReviews";
// Material UI Icons
import Public from "@mui/icons-material/Public";
// Styled components
import SelectWithIcon from "@/components/_utils/styled/SelectWithIcon";

interface SelectContinentProps {
    value: Continent;
    onChange(e: any): void;
}

const SelectContinent: FunctionComponent<SelectContinentProps> = (props) => (
    <SelectWithIcon
        value={props.value}
        onChange={props.onChange}
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
        sx={{ mr: "10px", width: "250px" }}
        icon={<Public />}
    ></SelectWithIcon>
);

export default SelectContinent;
