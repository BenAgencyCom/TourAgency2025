// Tools
import { styled, alpha } from "@mui/system";
import colorTheme from "@/colorTheme";
// Types
import type { SxProps } from "@mui/system";
import type { SelectProps } from "@mui/material/Select";
import type { FunctionComponent, ReactNode } from "react";
// Material UI Components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
// Material UI Icons
import Clear from "@mui/icons-material/Clear";
// Styled components
const StyledSelectBase = styled(Select)(({ theme }) => ({
    borderColor: theme.palette.text.primary,
    width: "220px",
    background: theme.palette.text.primary,
    transition: "background .2s,border .2s",
    svg: {
        color: "#fff",
    },
    "&.Mui-focused": {
        background: theme.palette.primary.main,
    },
    ".MuiSelect-icon": {
        display: "none",
    },
    "&.Mui-disabled": {
        border: `2px solid rgb(130,143,156) !important`,
        background: alpha(theme.palette.text.primary, 0.5),
        "button,textarea,input": {
            color: theme.palette.text.primary,
            fontWeight: 500,
        },
    },
}));

interface StyledSelectProps extends SelectProps {
    options: {
        label: string;
        value: any;
    }[];
    defaultValue?: any;
    icon: ReactNode;
    sx?: SxProps;
}

const StyledSelect: FunctionComponent<StyledSelectProps> = (props) => {
    const { icon, options, sx, ...propsToForward } = props;

    const clearInputValue = () => {
        (propsToForward as any).onChange({ target: { value: props.defaultValue } });
    };

    return (
        <StyledSelectBase
            {...propsToForward}
            sx={sx}
            inputProps={{
                sx: {
                    padding: "7px 0px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: colorTheme.typography.subtitle2.fontSize,
                },
            }}
            MenuProps={{
                sx: {
                    ul: {
                        background: colorTheme.palette.text.primary,
                        color: "#fff",
                    },
                    li: {
                        fontSize: colorTheme.typography.subtitle2.fontSize,
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
        </StyledSelectBase>
    );
};

export default StyledSelect;
