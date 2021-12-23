import { useState } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { Landmark } from "@/@types/Landmark";
// Material UI Components
import TextField from "@mui/material/TextField";

interface DescriptionProps {
    tabIndex: number;
    description: string;
    updateData: (prop: keyof Landmark, value: Landmark[typeof prop]) => void;
}

const Description: FunctionComponent<DescriptionProps> = (props) => {
    const [newDescription, setNewDescription] = useState<string>(props.description);
    const _setNewDescription = (e: ChangeEvent<HTMLInputElement>) => setNewDescription(e.target.value);
    const updateData = () => props.updateData("description", newDescription);

    return (
        <TextField
            value={newDescription}
            multiline={true}
            maxRows={5}
            label="Description"
            onChange={_setNewDescription}
            onBlur={updateData}
            inputProps={{
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
            sx={{
                width: "100%",
            }}
        ></TextField>
    );
};

export default Description;
