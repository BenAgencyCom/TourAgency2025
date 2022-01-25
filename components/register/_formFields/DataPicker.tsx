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
    sx?: Record<string, unknown>;
    _cypressTag?: string;
    // Methods
    updateValue: (value: Date | null) => void;
}

const TextInput: FunctionComponent<InputProps> = (props) => {
    const { label, value, updateValue } = props;
    const handleChange = (e: Date | null) => updateValue(e);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={label} //
                value={value}
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField
                        {...params} //
                        sx={{ ...props.sx }}
                        data-cy={props._cypressTag}
                    />
                )}
                inputFormat="dd/MM/yyyy"
                OpenPickerButtonProps={{ tabIndex: -1 }}
            />
        </LocalizationProvider>
    );
};

export default TextInput;
