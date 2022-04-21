// Tools
import colorTheme from "@/colorTheme";
// Types
import type { SelectProps } from "@mui/material/Select";
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
// Material UI Icons
import Clear from "@mui/icons-material/Clear";

interface StyledSelectProps extends SelectProps {
    options: {
        label: string;
        value: any;
    }[];
    defaultValue: any;
    icon: ReactNode;
}

const StyledSelect: FunctionComponent<StyledSelectProps> = (props) => {
    const { icon, options, sx, ...propsToForward } = props;

    const clearInputValue = () => {
        (propsToForward as any).onChange({ target: { value: props.defaultValue } });
    };

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
                ".MuiSelect-icon": {
                    display: "none",
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
            endAdornment={
                props.defaultValue && (
                    <InputAdornment position="end" sx={{ p: 0, opacity: 0.7, mr: "4px" }}>
                        <IconButton disabled={(propsToForward.value as string) === props.defaultValue} onClick={clearInputValue}>
                            <Clear></Clear>
                        </IconButton>
                    </InputAdornment>
                )
            }
            IconComponent={undefined}
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
