// Tools
import { validateLength, lengthRestrictionMessage } from "@/utils/client/lenghRestrictionHelpers";
// Types
import type { Theme } from "@mui/system";
import type { FunctionComponent } from "react";
import type { Restriction } from "@/@types/Restriction";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import TextField from "@mui/material/TextField";

interface CityProps {
    restrictions: Restriction;
    city: StatedDataField<string>;
    sx?: Record<any, unknown>;
}

const City: FunctionComponent<CityProps> = (props) => {
    const { city, restrictions } = props;
    return (
        <TextField
            label="City" //
            value={city.value}
            onChange={(e: { target: { value: string } }) => city.setValue(e.target.value)}
            sx={props.sx ? props.sx : {}}
            inputProps={{
                maxLength: props.restrictions.max,
            }}
            helperText={lengthRestrictionMessage(city.value, restrictions)}
            FormHelperTextProps={{ sx: { textAlign: "right" } }}
            error={validateLength(city.value, restrictions)}
        ></TextField>
    );
};

export default City;
