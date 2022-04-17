// Tools
import colorTheme from "@/colorTheme";
// Types
import type { FunctionComponent, ReactNode } from "react";
import type { InputBaseProps } from "@mui/material/InputBase";
// Material UI Components
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";

interface StyledSelectProps extends InputBaseProps {
    icon: ReactNode;
}

const StyledSelect: FunctionComponent<StyledSelectProps> = (props) => {
    const { sx, icon, ...propsToForward } = props;

    return (
        <InputBase
            sx={{
                borderColor: colorTheme.palette.text.primary,
                width: "200px",
                background: colorTheme.palette.text.primary,
                paddingLeft: "14px",
                borderRadius: "4px",
                boxSizing: "border-box",
                border: `2px solid  ${colorTheme.palette.text.primary}`,
                "&.Mui-focused": {
                    border: `2px solid  ${colorTheme.palette.primary.main}`,
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
            startAdornment={
                <InputAdornment position="start" sx={{ p: 0, opacity: 0.7 }}>
                    {icon}
                </InputAdornment>
            }
            // Has to be at the end so as to overwritte every above property!
            {...propsToForward}
        ></InputBase>
    );
};

export default StyledSelect;
