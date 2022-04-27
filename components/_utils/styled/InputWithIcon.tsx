// Tools
import colorTheme from "@/colorTheme";
// Types
import type { FunctionComponent, ReactNode } from "react";
import type { InputBaseProps } from "@mui/material/InputBase";
// Material UI Components
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
// Material UI Icons
import Clear from "@mui/icons-material/Clear";

interface StyledSelectProps extends InputBaseProps {
    icon: ReactNode;
}

const StyledSelect: FunctionComponent<StyledSelectProps> = (props) => {
    const { sx, icon, ...propsToForward } = props;
    const clearInputValue = () => {
        (propsToForward as any).onChange({ target: { value: "" } });
    };

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
                transition: "background .2s,border .2s",
                "&.Mui-focused": {
                    border: `2px solid  ${colorTheme.palette.primary.main}`,
                    background: colorTheme.palette.primary.main,
                },
                fontSize: colorTheme.typography.subtitle2.fontSize,
                // Has to be at the end so as to overwritte every above property!
                ...sx,
            }}
            inputProps={{
                sx: {
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                },
            }}
            startAdornment={
                <InputAdornment position="start" sx={{ p: 0, opacity: 0.7 }}>
                    {icon}
                </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end" sx={{ p: 0, opacity: 0.7 }}>
                    <IconButton disabled={!!!(propsToForward.value as string).length} onClick={clearInputValue}>
                        <Clear></Clear>
                    </IconButton>
                </InputAdornment>
            }
            // Has to be at the end so as to overwritte every above property!
            {...propsToForward}
        ></InputBase>
    );
};

export default StyledSelect;
