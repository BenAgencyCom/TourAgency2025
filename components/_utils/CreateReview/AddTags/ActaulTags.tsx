// Tools
import { useContext } from "react";
import { styled } from "@mui/system";
import { CreateReviewContext } from "../context";
import { fadeIn } from "@/components/_utils/styled/keyframes";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import IconButton from "@mui/material/IconButton";
// Material UI Icons
import Close from "@mui/icons-material/Close";
// Styled components
const ActualTagsWrapper = styled("div")(({ theme }) => ({
    minHeight: "64px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
}));
const SingleTag = styled("div")(({ theme }) => ({
    fontSize: "1.1rem",
    padding: "3px 10px",
    borderRadius: "3px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    transition: "background .3s ease-in-out",
    margin: "10px 5px 0px 0",
    animation: `${fadeIn} .3s ease-in-out both`,
    button: {
        padding: 0,
        marginLeft: "5px",
        svg: {
            color: "#fff",
        },
    },
}));

interface ActualTagsProps {
    tags: string[];
    deleteTag: (index: number) => void;
}

const ActualTags: FunctionComponent<ActualTagsProps> = (props) => {
    const context = useContext(CreateReviewContext);
    return (
        <ActualTagsWrapper>
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
        </ActualTagsWrapper>
    );
};

export default ActualTags;
