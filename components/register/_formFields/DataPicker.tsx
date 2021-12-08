import type { FunctionComponent } from "react";
// Material UI components
import Box from "@mui/material/Box";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import styles from "@/sass/mixins.module.sass";

interface InputProps {
    // Properties
    label: string;
    value: Date | null;
    buttonStyles: Record<string, any>;
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
                renderInput={(params) => <TextField {...params} sx={props.buttonStyles} />}
                inputFormat="dd/MM/yyyy"
                OpenPickerButtonProps={{ tabIndex: -1 }}
            />
        </LocalizationProvider>
    );
};

export default TextInput;
