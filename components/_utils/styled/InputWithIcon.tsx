// Tools
import { styled } from "@mui/system";
import colorTheme from "@/colorTheme";
// Types
import type { InputBaseProps } from "@mui/material/InputBase";
import type { FunctionComponent, ReactNode, ChangeEvent } from "react";
import type { Restriction } from "@/@types/Restriction";
// Material UI Components
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
// Other components
import LengthNotification from "@/components/_utils/LengthNotification";
// Material UI Icons
import Clear from "@mui/icons-material/Clear";
// Styled components
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    borderColor: theme.palette.text.primary,
    width: "200px",
    background: theme.palette.text.primary,
    paddingLeft: "14px",
    borderRadius: "4px",
    boxSizing: "border-box",
    border: `2px solid  ${theme.palette.text.primary}`,
    transition: "background .2s,border .2s",
    fontSize: colorTheme.typography.subtitle2.fontSize,
    "input,textarea": {
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
    },
    textarea: {
        "&::-webkit-scrollbar": { width: "10px" },
        "&::-webkit-scrollbar-track": { boxShadow: "inset 0 0 2px rgba(0,0,0,0.5)" },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "2px",
        },
    },
    "&.Mui-focused": {
        border: `2px solid  ${theme.palette.primary.main}`,
        background: theme.palette.primary.main,
        textarea: {
            "&::-webkit-scrollbar-thumb": {
                borderRadius: "2px",
                backgroundColor: theme.palette.text.primary,
            },
        },
    },
}));

interface StyledSelectProps extends InputBaseProps {
    icon?: ReactNode;
    lengthNotification?: {
        fieldName: string;
        restrictions: Restriction;
    };
}

const StyledSelect: FunctionComponent<StyledSelectProps> = (props) => {
    const { icon, onChange, lengthNotification, ...propsToForward } = props;

    const clearInputValue = () => {
        if (props.onChange) props.onChange({ target: { value: "" } } as any);
    };

    const onChangeMiddleware = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.lengthNotification) {
            const { min, max } = props.lengthNotification.restrictions;
            const { length } = e.target.value;

            if (length > max) return;
        }
        if (props.onChange) props.onChange(e as any);
    };

    return (
        <>
            <StyledInputBase
                startAdornment={
                    icon && (
                        <InputAdornment position="start" sx={{ p: 0, opacity: 0.7 }}>
                            {icon}
                        </InputAdornment>
                    )
                }
                endAdornment={
                    !props.multiline && (
                        <InputAdornment position="end" sx={{ p: 0, opacity: 0.7 }}>
                            <IconButton disabled={!!!(propsToForward.value as string).length} onClick={clearInputValue}>
                                <Clear></Clear>
                            </IconButton>
                        </InputAdornment>
                    )
                }
                onChange={onChangeMiddleware}
                // Has to be at the end so as to overwritte every above property!
                {...(propsToForward as any)}
            ></StyledInputBase>

            {lengthNotification && (
                <LengthNotification
                    fieldName={lengthNotification.fieldName} //
                    restrictions={lengthNotification.restrictions}
                    text={props.value as string}
                />
            )}
        </>
    );
};

export default StyledSelect;
