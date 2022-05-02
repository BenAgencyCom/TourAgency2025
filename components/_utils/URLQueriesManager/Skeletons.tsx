// Tools
// Other Components
import Skeleton from "@mui/material/Skeleton";
// Types
import type { FunctionComponent, ReactNode } from "react";

interface URLQueriesSkeletonsProps {
    amountOfSelects: number;
    includeSearchingBar: boolean;
}

const URLQueriesSkeletons: FunctionComponent<URLQueriesSkeletonsProps> = (props) => {
    const createSkeleton = (width: string): ReactNode => <Skeleton sx={{ width, height: "40px" }} variant="rectangular"></Skeleton>;

    const Skeletons: ReactNode[] = [];
    for (let i = 0; i < props.amountOfSelects; i++) Skeletons.push(createSkeleton("220px"));
    if (props.includeSearchingBar) Skeletons.unshift(createSkeleton("400px"));

    return <>{Skeletons}</>;
};

export default URLQueriesSkeletons;
