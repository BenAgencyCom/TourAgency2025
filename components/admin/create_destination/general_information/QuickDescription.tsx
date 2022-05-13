// Tools
import { validateLength, lengthRestrictionMessage } from "@/utils/client/lenghRestrictionHelpers";
// Types
import type { Theme } from "@mui/system";
import type { FunctionComponent } from "react";
import type { Restriction } from "@/@types/Restriction";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Components
import TextField from "@mui/material/TextField";

interface QuickDescriptionProps {
    restrictions: Restriction;
    quickDescription: StatedDataField<string>;
    sx?: Record<any, unknown>; // Mainly for spacing bottom purposes
}

const QuickDescription: FunctionComponent<QuickDescriptionProps> = (props) => {
    const { quickDescription, restrictions } = props;

    return (
        <TextField
            label="Description" //
            sx={props.sx ? props.sx : {}}
            inputProps={{
                maxLength: props.restrictions.max,
                sx: {
                    width: "100%",
                    pr: "10px",
                    "&::-webkit-scrollbar": { width: "10px" },
                    "&::-webkit-scrollbar-track": { boxShadow: "inset 0 0 2px rgba(0,0,0,0.5)" },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: (theme: Theme) => theme.palette.primary.main,
                        borderRadius: "2px",
                    },
                },
            }}
            value={quickDescription.value}
            onChange={(e: { target: { value: string } }) => quickDescription.setValue(e.target.value)}
            multiline={true}
            maxRows={2}
            helperText={lengthRestrictionMessage(quickDescription.value, restrictions)}
            error={validateLength(quickDescription.value, restrictions)}
            FormHelperTextProps={{ sx: { textAlign: "right" } }}
        ></TextField>
    );
};

export default QuickDescription;
