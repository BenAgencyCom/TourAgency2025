import type { FunctionComponent, ChangeEvent } from "react";
// Material UI components
import TextField from "@mui/material/TextField";

interface InputProps {
    // Properties
    label: string;
    value: string;
    // Optional
    sx?: Record<string, unknown>;
    errorMsg?: string | false;
    onBlur?: () => void;
    disabled?: boolean;
    multiline?: boolean;
    // Methods
    updateValue: (value: string) => void;
}

const TextInput: FunctionComponent<InputProps> = (props) => {
    const { label, value, updateValue, disabled } = props;
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => updateValue(e.target.value);

    return (
        <TextField
            label={label}
            value={value}
            onChange={handleChange}
            onBlur={props.onBlur}
            error={Boolean(props.errorMsg)}
            multiline={props.multiline ? props.multiline : false}
            variant="outlined"
            disabled={disabled !== undefined ? disabled : false}
            sx={{ ...props.sx }}
            helperText={props.errorMsg}
        ></TextField>
    );
};

export default TextInput;
