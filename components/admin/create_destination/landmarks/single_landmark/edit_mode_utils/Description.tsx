import { useState } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { Landmark } from "@/@types/pages/admin/create_destination/Landmark";
// Material UI Components
import TextField from "@mui/material/TextField";
import CREATE_DESTINATION_RESTRICTIONS from "@/utils/restrictions/createDestination_OLD";

interface DescriptionProps {
    tabIndex: number;
    description: string;
    updateData: (prop: keyof Landmark, value: Landmark[typeof prop]) => void;
}

const Description: FunctionComponent<DescriptionProps> = (props) => {
    const [newDescription, setNewDescription] = useState<string>(props.description);
    const _setNewDescription = (e: ChangeEvent<HTMLInputElement>) => setNewDescription(e.target.value);
    const updateData = () => props.updateData("description", newDescription);

    const limitLength = CREATE_DESTINATION_RESTRICTIONS.landmark.description.max;

    return (
        <TextField
            value={newDescription}
            multiline={true}
            maxRows={5}
            label="Description"
            onChange={_setNewDescription}
            onBlur={updateData}
            inputProps={{
                maxLength: limitLength,
                tabIndex: props.tabIndex,
                sx: {
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": { width: "10px" },
                    "&::-webkit-scrollbar-track": { boxShadow: "inset 0 0 2px rgba(0,0,0,0.5)" },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#fff",
                        borderRadius: "2px",
                    },
                },
            }}
            helperText={`${newDescription.length}/${limitLength}`}
            FormHelperTextProps={{ sx: { textAlign: "right" } }}
            sx={{
                width: "100%",
            }}
            error={newDescription.length > limitLength}
        ></TextField>
    );
};

export default Description;
