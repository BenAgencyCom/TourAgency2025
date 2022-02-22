// Types
import type { FunctionComponent } from "react";
// Other components
import NoAuthenticated from "./NoAuthenticated";
import Authenticated from "./Authenticated";
import Field from "@/components/destinations/single/reviews/Field";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
const Ratings: FunctionComponent = (props) => {
    const { isAuthenticated } = useAppSelector((state) => state.authentication);
    return (
        <Field>
            {isAuthenticated ? <Authenticated></Authenticated> : <NoAuthenticated></NoAuthenticated>}
            {/*  */}
        </Field>
    );
};

export default Ratings;
