import { useState, useMemo } from "react";
import { alpha } from "@mui/system";
import CREATE_DESTINATION_RESTRICTIONS from "@/utils/restrictions/createDestination_OLD";
// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent, ChangeEvent, ReactNode } from "react";
import type { Landmark } from "@/@types/pages/admin/create_destination/Landmark";
// Material UI Components
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface TagsProps {
    landmark: ListItem<Landmark>;
    children: ReactNode;
    tabIndex: number;
}

const Tags: FunctionComponent<TagsProps> = (props) => {
    const { tags: currentTags } = props.landmark.data;
    const [newTag, setNewTag] = useState<string>("");
    const blockAddButton = useMemo<boolean>(() => newTag.length < 3, [newTag]);

    const _setNewTag = (e: ChangeEvent<HTMLInputElement>) => setNewTag(e.target.value);
    const addNewTag = () => {
        if (blockAddButton) return;
        props.landmark.changeProperty("tags", [...currentTags, newTag]);
        setNewTag("");
    };
    const deleteTag = (indexToDelete: number) => {
        props.landmark.changeProperty(
            "tags",
            currentTags.filter((_, index: number) => index !== indexToDelete)
        );
    };

    const limitLength = CREATE_DESTINATION_RESTRICTIONS.landmark.tag.max;

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                {props.children}
                <Box>
                    {currentTags.map((tag, index) => {
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
                    disabled={currentTags.length >= 3}
                    inputProps={{ tabIndex: props.tabIndex, maxLength: limitLength }}
                    FormHelperTextProps={{ sx: { textAlign: "right" } }}
                    error={newTag.length > limitLength}
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
