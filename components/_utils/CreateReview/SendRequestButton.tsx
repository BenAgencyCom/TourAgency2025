// Tools
import { useMemo } from "react";
import restrictions from "@/utils/restrictions/createReview";
// Types
import type { FunctionComponent } from "react";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";

interface SendRequestButtonProps {
    tags: string[];
    reviewContent: string;
}

const SendRequestButton: FunctionComponent<SendRequestButtonProps> = (props) => {
    const { reviewContent, tags } = props;

    const reviewContentIsNotOK = useMemo<boolean>(() => {
        const { min, max } = restrictions.content;
        const { length } = reviewContent;
        return length > max || length < min;
    }, [reviewContent]);

    const tagsAreNotOK = useMemo<boolean>(() => {
        const { min, max } = restrictions.tagsInGeneral;
        const { length: amountOfTags } = tags;
        return amountOfTags > max || amountOfTags < min;
    }, [tags]);

    return (
        <StyledButton
            primary //
            sx={{ mt: "40px", width: "200px" }}
            disabled={reviewContentIsNotOK || tagsAreNotOK}
        >
            Add review
        </StyledButton>
    );
};

export default SendRequestButton;
