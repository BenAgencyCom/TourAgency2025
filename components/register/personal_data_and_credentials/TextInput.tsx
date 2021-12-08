import type { FunctionComponent, ChangeEvent } from "react";
// Material UI components
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface InputProps {
    // Properties
    label: string;
    value: string;
    buttonStyles: Record<string, any>;
    // Methods
    updateValue: (value: string) => void;
}

const TextInput: FunctionComponent<InputProps> = (params) => {
    const { label, value, updateValue, buttonStyles } = params;
    const id = `text-inp-${label}`;
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => updateValue(e.target.value);

    return (
        <FormControl variant="outlined" sx={buttonStyles}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
                id={id} //
                label={label}
                value={value}
                onChange={handleChange}
            ></OutlinedInput>
        </FormControl>
    );
};

export default TextInput;
