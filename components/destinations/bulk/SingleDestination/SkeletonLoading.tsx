// Tools
import RWD from "./RWD";
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { MUIStyledCommonProps } from "@mui/system";
// Material UI Components
import Fade from "@mui/material/Fade";
import Skeleton from "@mui/material/Skeleton";
// Other components
import ReadMoreSkeletonLoading from "@/components/_utils/ReadMore/SkeletonLoading";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const SkeletonWrapper = styled("div")(({ theme }) => ({
    ...(RWD as any),
}));

const PointsDistributionSkeletonLoading: FunctionComponent<MUIStyledCommonProps> = (props) => {
    return (
        <Fade in={true}>
            <SkeletonWrapper sx={{ ...props.sx }} className="skeleton">
                {/* PICTRURE */}
                <Skeleton
                    className="single-destination-picture"
                    sx={{ height: "100%" }} //
                    variant="rectangular"
                />
                {/* Information */}
                <FlexBox column className="single-destination-information skeleton">
                    {/* Localization */}
                    <Skeleton sx={{ height: "30px", width: "250px", mb: "10px" }} variant="rectangular" />
                    {/* City name */}
                    <Skeleton sx={{ height: "60px", width: "350px", mb: "10px" }} variant="rectangular" />
                    {/* Description */}
                    <Skeleton sx={{ flexGrow: "1", width: "100%", mb: "10px" }} variant="rectangular" className="description" />
                    {/* Landmarks header */}
                    <Skeleton sx={{ height: "40px", width: "300px", mb: "10px" }} variant="rectangular" />
                    {/* Landmarks */}
                    <FlexBox
                        horizontal="between"
                        className="landmarks-wrapper" //
                        sx={{ m: "0 0 10px 0 !important", height: "80px" }}
                    >
                        <Skeleton
                            className="single-landmark" //
                            variant="rectangular"
                            sx={{ height: "100%" }}
                        />{" "}
                        <Skeleton
                            className="single-landmark" //
                            variant="rectangular"
                            sx={{ height: "100%" }}
                        />{" "}
                        <Skeleton
                            className="single-landmark" //
                            variant="rectangular"
                            sx={{ height: "100%" }}
                        />
                    </FlexBox>
                    {/* Read more */}
                    <ReadMoreSkeletonLoading />
                </FlexBox>
            </SkeletonWrapper>
        </Fade>
    );
};

export default PointsDistributionSkeletonLoading;
