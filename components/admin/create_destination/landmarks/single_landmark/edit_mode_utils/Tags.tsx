import { useState, useMemo } from "react";
import { alpha } from "@mui/system";
// Types
import type { FunctionComponent, ChangeEvent, ReactNode } from "react";
import type { Landmark } from "@/@types/Landmark";
// Material UI Components
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface TagsProps {
    data: Landmark;
    children: ReactNode;
    tabIndex: number;
    updateData: (prop: keyof Landmark, value: Landmark[typeof prop]) => void;
}

const Tags: FunctionComponent<TagsProps> = (props) => {
    const { data, updateData } = props;

    const [newTag, setNewTag] = useState<string>("");
    const _setNewTag = (e: ChangeEvent<HTMLInputElement>) => setNewTag(e.target.value);
    const blockAddButton = useMemo<boolean>(() => newTag.length < 3, [newTag]);

    const addNewTag = () => {
        if (blockAddButton) return;
        updateData("tags", [...data.tags, newTag]);
        setNewTag("");
    };
    const deleteTag = (indexToDelete: number) => {
        updateData(
            "tags",
            data.tags.filter((_, index: number) => index !== indexToDelete)
        );
    };

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2, width: "100%" }}>
                {props.children}
                <Box>
                    {props.data.tags.map((tag, index) => {
                        return (
                            <Chip
                                key={index} //
                                label={tag}
                                sx={{ fontWeight: "bold", mx: "3px" }}
                                tabIndex={props.tabIndex}
                                onDelete={() => deleteTag(index)}
                            ></Chip>
                        );
                    })}
                </Box>
            </Box>
            <Box sx={{ display: "flex", mt: 2, width: "100%" }}>
                <TextField
                    sx={{ flexGrow: 1 }} //
                    value={newTag}
                    label="New tag"
                    onChange={_setNewTag}
                    disabled={data.tags.length >= 3}
                    inputProps={{ tabIndex: props.tabIndex }}
                ></TextField>
                <Button
                    sx={{
                        ml: 2,
                        bgcolor: (theme) => alpha(theme.palette.background.default, 0.6),
                    }}
                    color="neutral"
                    variant="contained"
                    disabled={blockAddButton}
                    onClick={addNewTag}
                    tabIndex={props.tabIndex}
                >
                    Add
                </Button>
            </Box>
        </>
    );
};

export default Tags;
