// Tools
import { styled } from "@mui/system";
import { useContext } from "react";
import { CreateReviewContext } from "../context";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import IconButton from "@mui/material/IconButton";
// Material UI Icons
import Close from "@mui/icons-material/Close";
// Styled components

const SingleTag = styled("div")(({ theme }) => ({
    fontSize: "1.2rem",
    padding: "3px 10px",
    borderRadius: "3px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    transition: "background .3s ease-in-out",
    margin: "10px 10px 0px 0",
    button: {
        padding: 0,
        marginLeft: "5px",
    },
}));

interface ActualTagsProps {
    tags: string[];
    deleteTag: (index: number) => void;
}

const ActualTags: FunctionComponent<ActualTagsProps> = (props) => {
    const context = useContext(CreateReviewContext);
    return (
        <>
            {props.tags.map((item, index) => {
                return (
                    <SingleTag
                        key={index} //
                        sx={{ background: context.estimatedReviewColor }}
                    >
                        {item}
                        <IconButton onClick={() => props.deleteTag(index)}>
                            <Close />
                        </IconButton>
                    </SingleTag>
                );
            })}
        </>
    );
};

export default ActualTags;
