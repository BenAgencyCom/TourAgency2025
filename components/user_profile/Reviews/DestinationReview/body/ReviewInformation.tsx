// Tools
import moment from "moment";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
import type { SimpleReview } from "@/@types/pages/landmarks/SingleLandmark";
import type { ScoreColor } from "@/@types/pages/destinations/SingleDestination";
// Material UI Components
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
// Other components
import Date from "@/components/_utils/SingleReview/header/Date";
import SingleReviewTags from "@/components/_utils/SingleReview/SingleReviewTags";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";
import ScrollableBox from "@/components/_utils/styled/ScrollableBox";

const ExtendCollapseButton = styled(ButtonBase)(({ theme }) => ({
    fontSize: "1.3rem",
    margin: "0 0 3px 5px",
    fontWeight: "bold",
    color: theme.palette.primary.main,
}));

interface ReviewInformationProps {
    userReview: SimpleReview;
    extendReview: StatedDataField<boolean>;
}

const ReviewInformation: FunctionComponent<ReviewInformationProps> = (props) => {
    const { tags, review, points, createdAt } = props.userReview;

    const color = ((): ScoreColor => {
        if (points > 7.5) return "success";
        else if (points > 4.5) return "warning";
        return "error";
    })();

    const isExtended: boolean = props.extendReview.value;

    return (
        <FlexBox column sx={{ pt: "10px", flexGrow: "1" }}>
            <FlexBox
                column
                sx={
                    isExtended
                        ? {
                              pl: "110px", //
                              minHeight: "90px",
                              "&>*": {
                                  margin: "0",
                              },
                              mb: "10px",
                          }
                        : {}
                }
                vertical="evenly"
            >
                <Date createdAt={moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}></Date>
                <SingleReviewTags
                    color={color} //
                    tags={tags}
                ></SingleReviewTags>
            </FlexBox>

            {(() => {
                if (!isExtended) {
                    return (
                        <Typography variant="body2">
                            {review.slice(0, 180)}
                            {(() => {
                                if (review.length > 180) {
                                    return (
                                        <>
                                            ...
                                            <ExtendCollapseButton onClick={() => props.extendReview.setValue((val) => !val)}>Extend</ExtendCollapseButton>
                                        </>
                                    );
                                }
                            })()}
                        </Typography>
                    );
                } else {
                    return (
                        <ScrollableBox maxHeight="500px" sx={{ paddingLeft: "0 !important" }}>
                            <Typography variant="body2">
                                {review}
                                <ExtendCollapseButton onClick={() => props.extendReview.setValue((val) => !val)}>Collapse</ExtendCollapseButton>
                            </Typography>
                        </ScrollableBox>
                    );
                }
            })()}
        </FlexBox>
    );
};

export default ReviewInformation;
