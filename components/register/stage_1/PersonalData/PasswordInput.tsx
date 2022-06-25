import type { FunctionComponent, ChangeEvent } from "react";
import { useState } from "react";
// Material UI components
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
// Material UI icons
import Visiblity from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface InputProps {
    // Properties
    label: string;
    value: string;
    // Optional
    disabled?: boolean;
    sx?: Record<string, unknown>;
    _cypressTag?: string;
    error?: boolean;
    // Methods
    updateValue: (value: string) => void;
}
const PasswordInput: FunctionComponent<InputProps> = (props) => {
    const { label, value, updateValue, disabled } = props;
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
    const [newInputValue, setNewInputValue] = useState<string>(value);
    const [debounce, setDebounce] = useState<number>(0);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewInputValue(e.target.value);

        if (debounce) clearTimeout(debounce);
        setDebounce(
            setTimeout(() => {
                updateValue(e.target.value);
            }, 50) as any
        );
    };

    const togglePasswordVisibility = () => setPasswordVisibility((val) => !val);

    return (
        <FormControl variant="outlined" sx={props.sx}>
            <InputLabel htmlFor={`password-inp-${label}`}>{label}</InputLabel>
            <OutlinedInput
                id={`password-inp-${label}`}
                label={label}
                value={newInputValue}
                onChange={handleChange}
                type={passwordVisibility ? "text" : "password"}
                disabled={disabled !== undefined ? disabled : false}
                inputProps={{
                    "data-cy": props._cypressTag,
                }}
                error={props.error}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} tabIndex={-1} data-cy={`${props._cypressTag}-toggle-visibility`}>
                            {!passwordVisibility ? <Visiblity></Visiblity> : <VisibilityOff></VisibilityOff>}
                        </IconButton>
                    </InputAdornment>
                }
            ></OutlinedInput>
        </FormControl>
    );
};

export default PasswordInput;
