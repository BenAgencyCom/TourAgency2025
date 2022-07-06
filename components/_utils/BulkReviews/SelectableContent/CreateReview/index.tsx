// Types
import type { FunctionComponent } from "react";
// Other components
import CreateReviewContextProvider from "./CreateReviewContextProvider";
import CreateReviewContextConsumer from "./CreateReviewContextConsumer";

interface CreateReviewProps {
    showAuthenticatedUserReview: () => void;
}

const CreateReview: FunctionComponent<CreateReviewProps> = (props) => {
    return (
        <CreateReviewContextProvider>
            <CreateReviewContextConsumer showAuthenticatedUserReview={props.showAuthenticatedUserReview} />
        </CreateReviewContextProvider>
    );
};

export default CreateReview;
