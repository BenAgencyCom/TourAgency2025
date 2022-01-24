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
    buttonStyles: Record<string, any>;
    // Optional
    disabled?: boolean;
    _cypressTag?: string;
    // Methods
    updateValue: (value: string) => void;
}
const PasswordInput: FunctionComponent<InputProps> = (props) => {
    const { label, value, updateValue, buttonStyles, disabled } = props;
    const id = `password-inp-${label}`;
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => updateValue(e.target.value);

    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
    const togglePasswordVisibility = () => setPasswordVisibility((val) => !val);

    const icon = !passwordVisibility ? <Visiblity></Visiblity> : <VisibilityOff></VisibilityOff>;

    return (
        <FormControl variant="outlined" sx={buttonStyles}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
                id={id}
                label={label}
                value={value}
                onChange={handleChange}
                type={passwordVisibility ? "text" : "password"}
                disabled={disabled !== undefined ? disabled : false}
                inputProps={{
                    "data-cy": props._cypressTag,
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} tabIndex={-1} data-cy={`${props._cypressTag}-toggle-visibility`}>
                            {icon}
                        </IconButton>
                    </InputAdornment>
                }
            ></OutlinedInput>
        </FormControl>
    );
};

export default PasswordInput;
