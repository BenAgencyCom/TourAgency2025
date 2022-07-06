// Tools
import { styled } from "@mui/system";
import { fadeIn } from "@/components/_utils/styled/keyframes";
import useCreateReviewContext from "@/components/_utils/BulkReviews/SelectableContent/CreateReview/hooks/useCreateReviewContext";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import IconButton from "@mui/material/IconButton";
// Material UI Icons
import Close from "@mui/icons-material/Close";
// Styled components
const ActualTagsWrapper = styled("div")(({ theme }) => ({
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
    margin: "5px 5px 5px 0",
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
    const context = useCreateReviewContext();

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
