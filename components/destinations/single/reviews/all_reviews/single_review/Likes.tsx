// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/destinations/SingleDestination";
// Material UI Components
import Button from "@mui/material/Button";
// Material UI Icons
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbDown from "@mui/icons-material/ThumbDown";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";

const ThumbsWrapper = styled(Button)(({ theme }) => ({
    strong: {
        marginLeft: "5px",
    },
}));

interface LikesProps {
    feedback: Review["feedback"];
}

const Likes: FunctionComponent<LikesProps> = (props) => {
    return (
        <FlexBox horizontal="between" vertical="center">
            <FlexBox>
                <ThumbsWrapper color="inherit">
                    <ThumbUp></ThumbUp>
                    <strong>{props.feedback.likes}</strong>
                </ThumbsWrapper>

                <ThumbsWrapper color="inherit">
                    <ThumbDown></ThumbDown>
                    <strong>{props.feedback.dislikes}</strong>
                </ThumbsWrapper>
            </FlexBox>

            <Button variant="outlined" sx={{ padding: "3px 10px" }}>
                Report
            </Button>
        </FlexBox>
    );
};

export default Likes;
