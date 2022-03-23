// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { Review, ScoreColor } from "@/@types/pages/destinations/SingleDestination";
// Material UI Components
import Box from "@mui/material/Box";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Tag = styled(Box)<{ color: ScoreColor }>(({ theme, ...props }) => ({
    background: theme.palette[props.color].main,
    marginRight: "20px",
    padding: "3px 10px",
    borderRadius: 3,
    color: "#fff",
    textTransform: "capitalize",
}));

interface TagsProps {
    tags: Review["tags"];
    color: ScoreColor;
}

const ReviewsTags: FunctionComponent<TagsProps> = (props) => {
    return (
        <FlexBox sx={{ my: "20px" }}>
            {props.tags.map((item, index) => {
                return (
                    <Tag color={props.color} key={index}>
                        {item}
                    </Tag>
                );
            })}
        </FlexBox>
    );
};

export default ReviewsTags;
