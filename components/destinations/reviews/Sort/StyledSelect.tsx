// Tools
import colorTheme from "@/colorTheme";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StagedDataField";
// Material UI Components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface StyledSelectProps {
    options: {
        label: string;
        value: any;
    }[];
    sx?: Record<any, any>;
    value: string;
    onChange: (e: any) => void;
}

const StyledSelect: FunctionComponent<StyledSelectProps> = (props) => {
    return (
        <Select
            sx={{
                borderColor: colorTheme.palette.text.primary,
                width: "200px",
                ...props.sx,
            }}
            inputProps={{
                sx: {
                    padding: "10px 20px",
                    fontSize: "1.1rem",
                    background: colorTheme.palette.text.primary,
                    display: "flex",
                    alignItems: "center",
                },
            }}
            MenuProps={{
                sx: {
                    ul: {
                        background: colorTheme.palette.text.primary,
                        color: "#fff",
                    },
                },
            }}
            value={props.value}
            onChange={props.onChange}
        >
            {props.options.map((item, index) => {
                return (
                    <MenuItem value={item.value} key={index}>
                        {item.label}
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export default StyledSelect;