// Tools
import { useState } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
// Material UI components
import TextField from "@mui/material/TextField";

interface InputProps {
    // Properties
    label: string;
    value: string;
    // Optional
    sx?: Record<string, unknown>;
    error?: boolean;
    onBlur?: () => void;
    disabled?: boolean;
    multiline?: boolean;
    _cypressTag?: string;
    // Methods
    updateValue: (value: string) => void;
}

const TextInput: FunctionComponent<InputProps> = (props) => {
    const { label, value, updateValue, disabled } = props;
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

    return (
        <TextField
            variant="outlined"
            label={label}
            value={newInputValue}
            onChange={handleChange}
            onBlur={props.onBlur}
            error={props.error}
            multiline={props.multiline ? props.multiline : false}
            disabled={disabled !== undefined ? disabled : false}
            sx={{ ...props.sx }}
            FormHelperTextProps={{
                "data-cy": `${props._cypressTag}-error`,
            }}
            inputProps={{
                "data-cy": props._cypressTag,
            }}
        ></TextField>
    );
};

export default TextInput;
