// Tools
import colorTheme from "@/colorTheme";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";

interface StyledSelectProps {
    sx?: SxProps;
    value: string;
    onChange: (e: any) => void;
    placeholder?: string;
    icon: ReactNode;
}

const StyledSelect: FunctionComponent<StyledSelectProps> = (props) => {
    return (
        <InputBase
            sx={{
                borderColor: colorTheme.palette.text.primary,
                width: "200px",
                ...props.sx,
                background: colorTheme.palette.text.primary,
                paddingLeft: "14px",
                borderRadius: "4px",
                boxSizing: "border-box",
                border: `2px solid  ${colorTheme.palette.text.primary}`,
                "&.Mui-focused": {
                    border: `2px solid  ${colorTheme.palette.primary.main}`,
                },
            }}
            inputProps={{
                sx: {
                    padding: "10px 20px",
                    fontSize: "1.1rem",
                    display: "flex",
                    alignItems: "center",
                },
            }}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            startAdornment={
                <InputAdornment position="start" sx={{ p: 0, opacity: 0.7 }}>
                    {props.icon}
                </InputAdornment>
            }
        ></InputBase>
    );
};

export default StyledSelect;
