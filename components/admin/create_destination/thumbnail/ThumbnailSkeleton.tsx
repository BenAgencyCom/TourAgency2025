// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Skeleton from "@mui/material/Skeleton";

const ThumbnailSkeleton: FunctionComponent = () => {
    return <Skeleton animation="wave" sx={{ width: "100%", height: "100%" }} variant="rectangular"></Skeleton>;
};

export default ThumbnailSkeleton;
