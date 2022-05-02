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
    const createSkeleton = (width: string, i: any): ReactNode => <Skeleton key={i} sx={{ width, height: "100%" }} variant="rectangular"></Skeleton>;

    const Skeletons: ReactNode[] = [];
    for (let i = 0; i < props.amountOfSelects; i++) Skeletons.push(createSkeleton("220px", i));
    if (props.includeSearchingBar) Skeletons.unshift(createSkeleton("450px", "searching-bar"));

    return <>{Skeletons}</>;
};

export default URLQueriesSkeletons;
