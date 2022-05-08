// Tools
import { styled } from "@mui/system";
import _SingleReviewWrapperStyles from "./_SingleReviewWrapperStyles";
// Types
import type { FunctionComponent } from "react";
import type { MUIStyledCommonProps } from "@mui/system";
// Material UI Components
import Fade from "@mui/material/Fade";
import Skeleton from "@mui/material/Skeleton";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const SkeletonWrapper = styled("div")(({ theme }) => ({
    ...(_SingleReviewWrapperStyles as any),
    //
    display: "flex",
    flexDirection: "column",
}));

const PointsDistributionSkeletonLoading: FunctionComponent<MUIStyledCommonProps> = (props) => {
    return (
        <Fade in={true}>
            <SkeletonWrapper sx={props.sx}>
                {/* HEADER */}
                <FlexBox className="landmark-review-header" sx={{ mb: "10px" }}>
                    <FlexBox sx={{ mb: "10px" }}>
                        <Skeleton
                            className="landmark-review-score"
                            sx={{ height: "80px", width: "90px" }} //
                            variant="rectangular"
                        />{" "}
                        <Skeleton
                            className="landmark-reviewer-avatar"
                            sx={{ height: "80px", width: "80px", mx: "20px" }} //
                            variant="rectangular"
                        />
                    </FlexBox>
                    <FlexBox column sx={{ flexGrow: "1", pb: "10px" }} vertical="between">
                        <Skeleton
                            className="date" //
                            sx={{ height: "35px", mb: "10px", width: "220px" }}
                            variant="rectangular"
                        />
                        <Skeleton
                            className="personal-information" //
                            sx={{ height: "35px", width: "400px" }}
                            variant="rectangular"
                        />
                    </FlexBox>
                </FlexBox>
                {/* TAGS */}
                <FlexBox sx={{ my: "0px" }} className="landmark-review-tags">
                    <Skeleton sx={{ height: "30px", width: "160px", mr: "20px" }} variant="rectangular" />
                    <Skeleton sx={{ height: "30px", width: "160px", mr: "20px" }} variant="rectangular" />
                    <Skeleton sx={{ height: "30px", width: "160px" }} variant="rectangular" />
                </FlexBox>
                {/* Content */}
                <Skeleton component="p" sx={{ height: "120px", width: "100%" }} variant="rectangular" />
                {/* Likes */}
                <Skeleton sx={{ height: "30px", width: "200px", mt: "20px" }} variant="rectangular" />
            </SkeletonWrapper>
        </Fade>
    );
};

export default PointsDistributionSkeletonLoading;
