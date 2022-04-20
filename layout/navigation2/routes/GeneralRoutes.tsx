// Types
import type { FunctionComponent } from "react";
// Other components
import SingleRedirect from "./SingleRedirect";

const GeneralRoutes: FunctionComponent = () => {
    return (
        <>
            <SingleRedirect url="/destinations">Destinations</SingleRedirect>
            <SingleRedirect url="/landmarks">Sights</SingleRedirect>
            <SingleRedirect url="/">Gorzen</SingleRedirect>
        </>
    );
};

export default GeneralRoutes;
