// Tools
import { styled } from "@mui/system";
import { useState, useRef, useMemo } from "react";
import restrictions from "@/utils/restrictions/createReview";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Material UI Icons
import Add from "@mui/icons-material/Add";
// Other components
import ActualTags from "./ActaulTags";
import TagsPlaceholder from "./TagsPlaceholder";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import StyledButton from "@/components/create/_utils/forms/Button";
import StyledInput from "@/components/_utils/styled/InputWithIcon";

const AddTagsWrapper = styled("div")(({ theme }) => ({
    marginBottom: "20px",
    display: "flex",
    width: "100%",
    ["@media (max-width:500px)"]: {
        ".MuiInputBase-root": {
            width: "100% ",
        },
    },
}));

interface AddTagsProps {
    tags: StatedDataField<string[]>;
}

const AddTags: FunctionComponent<AddTagsProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>();
    const [newTag, setNewTag] = useState<string>("");

    const disableAddButton = useMemo<boolean>(() => {
        const { length: actualLength } = newTag;
        const { min, max } = restrictions.singleTag;
        const { length: amountOfTags } = props.tags.value;
        const { max: limitOfTags } = restrictions.tagsInGeneral;

        return amountOfTags >= limitOfTags || actualLength > max || actualLength < min;
    }, [newTag, props.tags.value]);

    const addNewTag = () => {
        setNewTag("");
        props.tags.setValue((currentTags) => [...currentTags, newTag]);
        setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
        }, 1);
    };

    const deleteParticularTag = (index: number) => {
        props.tags.setValue((currentTags) => [...currentTags.slice(0, index), ...currentTags.slice(index + 1)]);
    };

    return (
        <AddTagsWrapper className="add-tags">
            <FlexBox vertical="center">
                <StyledInput
                    ref={inputRef}
                    value={newTag} //
                    onChange={(e) => setNewTag(e.target.value)}
                    sx={{
                        width: "300px",
                        height: "40px",
                        input: {
                            padding: "5px 0", //
                        },
                    }}
                    placeholder="What's relevant..."
                    key={props.tags.value.length}
                    disabled={props.tags.value.length >= restrictions.tagsInGeneral.max}
                ></StyledInput>

                <StyledButton
                    primary //
                    sx={{ padding: "0", width: "40px", ml: "10px" }}
                    onClick={addNewTag}
                    disabled={disableAddButton}
                >
                    <Add />
                </StyledButton>
            </FlexBox>

            <FlexBox className="tags" sx={{ flexGrow: 1, ml: "50px" }}>
                {(() => {
                    if (props.tags.value.length) {
                        return (
                            <ActualTags
                                tags={props.tags.value} //
                                deleteTag={deleteParticularTag}
                            />
                        );
                    } else return <TagsPlaceholder />;
                })()}
            </FlexBox>
        </AddTagsWrapper>
    );
};

export default AddTags;
