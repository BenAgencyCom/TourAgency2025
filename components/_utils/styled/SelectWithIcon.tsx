// Tools
import colorTheme from "@/colorTheme";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

interface StyledSelectProps {
    options: {
        label: string;
        value: any;
    }[];
    sx?: SxProps;
    value: string;
    onChange: (e: any) => void;
    icon: ReactNode;
}

const StyledSelect: FunctionComponent<StyledSelectProps> = (props) => {
    return (
        <Select
            sx={{
                borderColor: colorTheme.palette.text.primary,
                width: "200px",
                ...props.sx,
                background: colorTheme.palette.text.primary,
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
            startAdornment={
                <InputAdornment position="start" sx={{ p: 0, opacity: 0.7 }}>
                    {props.icon}
                </InputAdornment>
            }
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
