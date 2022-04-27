// Tools
import dynamic from "next/dynamic";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
const Score = dynamic(() => import("./header/Score"));
import type { Review } from "@/@types/pages/api/ReviewsAPI";
import type { ScoreColor } from "@/@types/pages/destinations/SingleDestination";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Tag = styled("div")<{ color: ScoreColor }>(({ theme, ...props }) => ({
    background: theme.palette[props.color].main,
    marginRight: "20px",
    padding: "3px 10px",
    borderRadius: 3,
    color: "#fff",
    fontSize: "1.2rem",
    textTransform: "capitalize",
    marginBottom: "5px",
    ["@media (max-width:700px)"]: {
        marginRight: "10px",
        fontSize: "1.1rem",
    },
}));

interface TagsProps {
    tags: Review["tags"];
    color: ScoreColor;
}

const ReviewsTags: FunctionComponent<TagsProps> = (props) => {
    const { color, tags } = props;
    return (
        <FlexBox sx={{ my: "15px", flexWrap: "wrap" }} className="landmark-review-tags">
            {tags.map((item, index) => {
                return (
                    <Tag color={color} key={index}>
                        {item}
                    </Tag>
                );
            })}
        </FlexBox>
    );
};

export default ReviewsTags;
