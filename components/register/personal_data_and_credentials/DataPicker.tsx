import type { FunctionComponent } from "react";
// Material UI components
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

interface InputProps {
    // Properties
    label: string;
    value: Date | null;
    // Methods
    updateValue: (value: Date | null) => void;
}

const TextInput: FunctionComponent<InputProps> = (params) => {
    const { label, value, updateValue } = params;
    const handleChange = (e: Date | null) => updateValue(e);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={label} //
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};

export default TextInput;
