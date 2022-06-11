// Tools
import { styled } from "@mui/system";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const Tag = styled("div")(({ theme }) => ({
    marginRight: "5px",
    marginBottom: "5px",
    padding: "3px 10px",
    borderRadius: 3,
    color: "#fff",
    fontSize: "1.1rem",
    textTransform: "capitalize",
    ["@media (max-width:700px)"]: {
        marginRight: "10px",
    },
}));

interface TagsProps {
    tags: Review["tags"];
    color: string;
    sx?: SxProps;
}

const ReviewsTags: FunctionComponent<TagsProps> = (props) => {
    const { color, tags } = props;
    return (
        <FlexBox sx={{ my: "15px", flexWrap: "wrap", ...props.sx }} className="landmark-review-tags">
            {tags.map((item, index) => {
                return (
                    <Tag
                        sx={{ background: color }} //
                        key={index}
                    >
                        {item}
                    </Tag>
                );
            })}
        </FlexBox>
    );
};

export default ReviewsTags;
