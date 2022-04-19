// Tools
import colorTheme from "@/colorTheme";
// Types
import type { SelectProps } from "@mui/material/Select";
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

interface StyledSelectProps extends SelectProps {
    options: {
        label: string;
        value: any;
    }[];
    icon: ReactNode;
}

const StyledSelect: FunctionComponent<StyledSelectProps> = (props) => {
    const { icon, options, sx, ...propsToForward } = props;
    return (
        <Select
            {...propsToForward}
            sx={{
                borderColor: colorTheme.palette.text.primary,
                width: "200px",
                background: colorTheme.palette.text.primary,
                transition: "background .2s,border .2s",
                "&.Mui-focused": {
                    background: colorTheme.palette.primary.main,
                },
                // Has to be at the end so as to overwritte every above property!
                ...sx,
            }}
            inputProps={{
                sx: {
                    padding: "10px 20px",
                    fontSize: "1.1rem",
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
            startAdornment={
                <InputAdornment position="start" sx={{ p: 0, opacity: 0.7 }}>
                    {props.icon}
                </InputAdornment>
            }
        >
            {options.map((item, index) => {
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
