// Types
import type { FunctionComponent } from "react";
import type { MUIStyledCommonProps } from "@mui/system";
// Material UI Components
import Skeleton from "@mui/material/Skeleton";
// Styled Components
import FlexBox from "@/components/_utils/styled/FlexBox";

const PointsDistributionSkeletonLoading: FunctionComponent<MUIStyledCommonProps> = (props) => {
    return (
        <FlexBox column sx={props.sx}>
            <Skeleton sx={{ height: "35px", mb: "10px", width: "50%" }} variant="rectangular" />
            <Skeleton sx={{ height: "30px", mb: "20px", width: "40%" }} variant="rectangular" />

            <FlexBox horizontal="between" sx={{ flexGrow: 1 }}>
                <Skeleton sx={{ width: "90px", height: "90px" }} variant="rectangular" />

                <FlexBox column sx={{ flexGrow: 1, ml: "20px" }} vertical="between">
                    <Skeleton sx={{ height: "28px", mb: "7px" }} variant="rectangular" />
                    <Skeleton sx={{ height: "28px", mb: "7px" }} variant="rectangular" />
                    <Skeleton sx={{ height: "28px", mb: "7px" }} variant="rectangular" />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    );
};

export default PointsDistributionSkeletonLoading;
