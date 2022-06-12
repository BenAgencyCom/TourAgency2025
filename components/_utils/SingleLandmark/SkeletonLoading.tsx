// Tools
import RWD from "./RWD";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { MUIStyledCommonProps } from "@mui/system";
// Material UI Components
import Skeleton from "@mui/material/Skeleton";
// Other components
import ReadMoreSkeletonLoading from "@/components/_utils/ReadMore/SkeletonLoading";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const LocalizationSkeleton = styled(Skeleton)(({ theme }) => ({
    height: "30px",
    width: "250px",
}));
const HeaderSkeleton = styled(Skeleton)(({ theme }) => ({
    marginTop: "10px",
    height: "40px",
    width: "100%",
    maxWidth: "380px",
}));
const ParagraphSkeleton = styled(Skeleton)(({ theme }) => ({
    marginTop: "10px",
    width: "100%",
    flexGrow: "1",
    ["@media (max-width:1000px)"]: {
        height: "200px",
    },
}));

const PointsDistributionSkeletonLoading: FunctionComponent<MUIStyledCommonProps> = (props) => {
    return (
        <FlexBox column sx={{ ...props.sx, ...(RWD as any) }} className="single-landmark-skeleton-wrapper">
            <Skeleton className="single-landmark-picture" variant="rectangular" />

            <FlexBox className="single-landmark-content" sx={{ mt: "10px" }} column>
                <LocalizationSkeleton variant="rectangular" />
                <HeaderSkeleton variant="rectangular" />
                <ParagraphSkeleton variant="rectangular" />
            </FlexBox>

            <ReadMoreSkeletonLoading variant="rectangular" />
            {props.children}
        </FlexBox>
    );
};

export default PointsDistributionSkeletonLoading;
