// Tools
import restrictions from "@/utils/restrictions/createReview";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { StatedDataField } from "@/@types/StatedDataField";
// Styled components
import StyledInput from "@/components/_utils/styled/InputWithIcon";

interface ReviewContentProps {
    reviewContent: StatedDataField<string>;
}

const ReviewContent: FunctionComponent<ReviewContentProps> = (props) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.reviewContent.setValue(e.target.value);
    };

    return (
        <StyledInput
            multiline //
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis neque vel augue luctus imperdiet. Proin dapibus eros quis condimentum sollicitudin. Aliquam porta pulvinar libero non aliquet. Integer egestas magna sed purus blandit, eget venenatis velit tristique. Vivamus pulvinar mauris eu ligula egestas, in tincidunt mauris efficitur. Donec eget fringilla ipsum, a venenatis enim. Praesent volutpat odio non pretium pharetra..."
            rows={5}
            onChange={onChange}
            value={props.reviewContent.value}
            sx={{
                width: "100%", //
                textarea: { padding: "5px 0" },
            }}
            lengthNotification={{
                fieldName: "review content",
                restrictions: restrictions.content,
            }}
        ></StyledInput>
    );
};

export default ReviewContent;
