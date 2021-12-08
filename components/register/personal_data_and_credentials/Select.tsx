import type { FunctionComponent, ChangeEvent } from "react";
// Material UI components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface InputProps {
    // Properties
    label: string;
    value: string;
    options: string[];
    buttonStyles: Record<string, any>;
    // Methods
    updateValue: (value: string) => void;
}

const TextInput: FunctionComponent<InputProps> = (params) => {
    const { label, value, updateValue, buttonStyles, options } = params;
    const id = `text-inp-${label}`;
    const handleChange = (e: any) => updateValue(e.target.value);

    return (
        <FormControl variant="outlined" sx={buttonStyles}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select
                id={id} //
                label={label}
                value={value}
                onChange={handleChange}
            >
                {options.map((option) => {
                    return (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default TextInput;
