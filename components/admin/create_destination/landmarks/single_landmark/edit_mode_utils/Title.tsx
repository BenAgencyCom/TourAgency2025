import { useState } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { Landmark } from "@/@types/Landmark";
// Material UI Components
import TextField from "@mui/material/TextField";

interface TitleProps {
    tabIndex: number;
    title: string;
    updateData: (prop: keyof Landmark, value: Landmark[typeof prop]) => void;
}

const Title: FunctionComponent<TitleProps> = (props) => {
    const [newTitle, setNewTitle] = useState<string>(props.title);
    const _setNewTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value);
    const updateData = () => props.updateData("title", newTitle);

    return (
        <TextField
            label="Title" //
            sx={{ width: "100%" }}
            value={newTitle}
            inputProps={{ tabIndex: props.tabIndex }}
            onChange={_setNewTitle}
            onBlur={updateData}
        ></TextField>
    );
};

export default Title;
