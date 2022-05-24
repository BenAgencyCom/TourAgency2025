// Tools
import CREATE_LANDMARK_RESTRICTIONS from "@/utils/restrictions/createLandmark";
// Types
import { ListItem } from "@/@types/redux";
import type { FunctionComponent, ChangeEvent } from "react";
import type { Restriction } from "@/@types/Restriction";
import type { ParagraphContentField } from "@/@types/Description";
// Other components
import InputWithIcon from "@/components/_utils/styled/InputWithIcon";

interface ParagraphBodyProps {
    field?: ListItem<ParagraphContentField>;
    restrictions: Restriction;
    // Only for splitted subfields
    split?: true;
    updateSingleProp?: (prop: keyof ParagraphContentField, val: ParagraphContentField[typeof prop]) => void;
    content?: string;
}

const ParagraphBody: FunctionComponent<ParagraphBodyProps> = (props) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (props.field) props.field.changeProperty("content", value);
        else if (props.updateSingleProp) props.updateSingleProp("content", value);
    };

    return (
        <InputWithIcon
            value={props.field ? props.field.data.content : (props.content as string)} //
            onChange={onChange}
            multiline={true}
            placeholder={
                props.split
                    ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis neque vel augue luctus imperdiet. Proin dapibus eros quis condimentum sollicitudin. Aliquam porta pulvinar libero non aliquet. Integer egestas magna sed purus blandit, eget venenatis velit tristique. Vivamus pulvinar mauris eu ligula egestas, in tincidunt mauris efficitur. Donec eget fringilla ipsum, a venenatis enim. Praesent volutpat odio non pretium pharetra"
                    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis neque vel augue luctus imperdiet. Proin dapibus eros quis condimentum sollicitudin. Aliquam porta pulvinar libero non aliquet. Integer egestas magna sed purus blandit, eget venenatis velit tristique. Vivamus pulvinar mauris eu ligula egestas, in tincidunt mauris efficitur. Donec eget fringilla ipsum, a venenatis enim. Praesent volutpat odio non pretium pharetra. Maecenas nibh libero, pharetra ac sem faucibus, rutrum luctus leo. Sed facilisis in nisl ac pellentesque. Cras bibendum consequat purus eu eleifend. In vitae leo neque. Duis faucibus purus vel turpis porta dictum. Donec tincidunt sagittis ligula at facilisis. Nunc eget pretium tortor. Donec dignissim eget risus vitae tristique. Nunc efficitur tortor nec quam consequat, ut vulputate elit rutrum...."
            }
            rows={props.split ? 10 : 6}
            sx={{ width: "100%" }}
            lengthNotification={{
                fieldName: "paragraph",
                restrictions: props.split ? CREATE_LANDMARK_RESTRICTIONS.description.splittedParagraph : CREATE_LANDMARK_RESTRICTIONS.description.paragraph,
            }}
        ></InputWithIcon>
    );
};

export default ParagraphBody;
