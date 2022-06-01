// Tools
import RWD from "./RWD";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { MUIStyledCommonProps } from "@mui/system";
// Material UI Components
import Skeleton from "@mui/material/Skeleton";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import ReadMoreSkeleton from "@/components/_utils/ReadMore/SkeletonLoading";

const LocalizationSkeleton = styled(Skeleton)(({ theme }) => ({
    maxWidth: "250px",
    width: "100%",
    height: "35px",
    marginTop: "10px",
}));
const HeaderSkeleton = styled(Skeleton)(({ theme }) => ({
    maxWidth: "350px",
    width: "100%",
    height: "50px",
    marginTop: "10px",
}));
const ShortDescriptionSkeleton = styled(Skeleton)(({ theme }) => ({
    width: "100%",
    flexGrow: "1",
    marginTop: "10px",
}));

const Wrapper = styled("div")(({ theme }) => ({
    ...(RWD as any),
    marginBottom: "20px",
    "&:nth-of-type(2),&:nth-of-type(4),&:nth-of-type(6),&:nth-of-type(8)": {
        marginLeft: "20px",
    },
    ["@media (max-width:1000px)"]: {
        marginLeft: "0 !important",
        width: "100%",
    },
}));

const DestinationReviewSkeletonLoading: FunctionComponent<MUIStyledCommonProps> = (props) => {
    return (
        <Wrapper {...props}>
            <Skeleton className="single-destination-review-picture" variant="rectangular" />
            <FlexBox className="single-destination-review-body" column>
                <LocalizationSkeleton variant="rectangular" />
                <HeaderSkeleton variant="rectangular" />
                <ShortDescriptionSkeleton variant="rectangular" />
                <ReadMoreSkeleton />
            </FlexBox>
        </Wrapper>
    );
};

export default DestinationReviewSkeletonLoading;
