// Types
import type { FunctionComponent } from "react";
import type { InputBaseProps } from "@mui/material/InputBase";
// Material UI Icons
import Search from "@mui/icons-material/Search";
// Styled components
import InputWithIcon from "@/components/_utils/styled/InputWithIcon";

const SelectOrder: FunctionComponent<InputBaseProps> = (props) => (
    <InputWithIcon
        icon={<Search />} //
        placeholder="Search for a place of your dreams..."
        sx={{ mr: "10px", width: "400px" }}
        inputProps={{
            maxLength: 30,
        }}
        {...props}
    ></InputWithIcon>
);

export default SelectOrder;
