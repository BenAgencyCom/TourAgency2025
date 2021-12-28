// Tools
import { useState } from "react";
import { lengthRestrictionMessage, validateLength } from "@/utils/client/lenghRestrictionHelpers";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { Restriction } from "@/@types/Restriction";
import type { DraggableHeaderContentField } from "@/@types/DestinationDescription";
// Material UI Components
import TextField from "@mui/material/TextField";

interface HeaderBodyProps {
    data: DraggableHeaderContentField;
    restrictions: Restriction;
    updateSingleProp: (prop: keyof DraggableHeaderContentField, val: DraggableHeaderContentField[typeof prop]) => void;
}

const HeaderBody: FunctionComponent<HeaderBodyProps> = (props) => {
    const [newHeader, setNewHeader] = useState<string>(props.data.header);
    const [invalid, setInvalid] = useState<boolean>(false);

    const onBlur = () => {
        props.updateSingleProp("header", newHeader);
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
