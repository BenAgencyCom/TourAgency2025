// Tools
import { styled } from "@mui/system";
import colorTheme from "@/colorTheme";
// Types
import type { InputBaseProps } from "@mui/material/InputBase";
import type { FunctionComponent, ReactNode, ChangeEvent } from "react";
// Material UI Components
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
// Material UI Icons
import Clear from "@mui/icons-material/Clear";
// Styled components
const LengthNotification = styled("span")(({ theme }) => ({
    fontSize: "1.2rem",
    marginTop: "5px",
    strong: {
        fontWeight: "900",
        color: theme.palette.primary.main,
    },
}));
interface StyledSelectProps extends InputBaseProps {
    icon: ReactNode;
    maxLength?: number;
}

const StyledSelect: FunctionComponent<StyledSelectProps> = (props) => {
    const { sx, icon, onChange, maxLength, ...propsToForward } = props;

    const clearInputValue = () => {
        if (props.onChange) props.onChange({ target: { value: "" } } as any);
    };

    const onChangeMiddleware = (e: ChangeEvent<HTMLInputElement>) => {
        const { length } = e.target.value;
        if (props.maxLength && length > props.maxLength) return;
        if (props.onChange) props.onChange(e as any);
    };

    return (
        <>
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
                onChange={onChangeMiddleware}
                // Has to be at the end so as to overwritte every above property!
                {...propsToForward}
            ></InputBase>
            {props.maxLength && props.value !== undefined && (
                <LengthNotification>
                    Length: <strong>{`${(props.value as string).length} / ${maxLength}`}</strong>
                </LengthNotification>
            )}
        </>
    );
};

export default StyledSelect;
