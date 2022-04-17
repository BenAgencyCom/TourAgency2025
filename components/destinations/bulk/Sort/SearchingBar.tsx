// Types
import type { FunctionComponent } from "react";
// Material UI Icons
import Search from "@mui/icons-material/Search";
// Styled components
import InputWithIcon from "@/components/_utils/styled/InputWithIcon";

interface SelectOrderProps {
    value: string;
    onChange(e: any): void;
}

const SelectOrder: FunctionComponent<SelectOrderProps> = (props) => (
    <InputWithIcon
        value={props.value} //
        onChange={props.onChange}
        icon={<Search />}
        sx={{ mr: "10px", width: "400px" }}
        placeholder="Search for a place of your dreams..."
    ></InputWithIcon>
);

export default SelectOrder;
