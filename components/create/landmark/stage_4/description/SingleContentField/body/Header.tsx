// Tools
import { useState } from "react";
import { lengthRestrictionMessage, validateLength } from "@/utils/client/lenghRestrictionHelpers";
// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent, ChangeEvent } from "react";
import type { Restriction } from "@/@types/Restriction";
import type { HeaderContentField } from "@/@types/Description";
// Material UI Components
import TextField from "@mui/material/TextField";

interface HeaderBodyProps {
    field: ListItem<HeaderContentField>;
    restrictions: Restriction;
}

const HeaderBody: FunctionComponent<HeaderBodyProps> = (props) => {
    const [newHeader, setNewHeader] = useState<string>(props.field.data.header);
    const [invalid, setInvalid] = useState<boolean>(false);

    const onBlur = () => {
        props.field.changeProperty("header", newHeader);
        setInvalid(validateLength(newHeader, props.restrictions));
    };
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewHeader(e.target.value);
        if (invalid) setInvalid(validateLength(newHeader, props.restrictions));
    };

    return (
        <TextField
            value={newHeader} //
            onChange={onChange}
            onBlur={onBlur}
            helperText={lengthRestrictionMessage(newHeader, props.restrictions, "header")}
            inputProps={{
                maxLength: props.restrictions.max, //
            }}
            FormHelperTextProps={{ sx: { textAlign: "right" } }}
            error={invalid}
            sx={{ width: "100%" }}
        ></TextField>
    );
};

export default HeaderBody;
