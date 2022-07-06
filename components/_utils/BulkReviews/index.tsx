// Types
import type { FunctionComponent } from "react";
import type { BulkReviewsProps } from "./context";
// Other components
import BulkReviewsContextProvider from "./BulkReviewsContextProvider";
import BulkReviewsContextConsumer from "./BulkReviewsContextConsumer";

const Content: FunctionComponent<BulkReviewsProps> = (props) => {
    return (
        <BulkReviewsContextProvider {...props}>
            <BulkReviewsContextConsumer />
        </BulkReviewsContextProvider>
    );
};

export default Content;
