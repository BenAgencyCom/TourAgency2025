// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
import type { SkeletonProps } from "@mui/material/Skeleton";
// Material UI Components
import Skeleton from "@mui/material/Skeleton";

const ReadMoreSkeletonLoading = styled(Skeleton)(({ theme }) => ({
    marginTop: "10px",
    width: "150px",
    height: "35px",
    ["@media (max-width:1000px)"]: {
        marginTop: "50px",
        alignSelf: "center",
        width: "100%",
        maxWidth: "400px",
        height: "40px",
    },
}));

const ReadMoreWrapper: FunctionComponent<SkeletonProps> = (props: any) => {
    return <ReadMoreSkeletonLoading variant="rectangular" {...props} />;
};

export default ReadMoreWrapper;
