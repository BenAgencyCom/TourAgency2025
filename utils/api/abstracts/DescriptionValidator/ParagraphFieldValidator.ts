// Tools
import type { Restriction } from "@/@types/Restriction";
import restrictions from "@/utils/restrictions/createDescription";
import SingleFieldValidatorAbstract from "./SingleFieldValidatorAbstract";
// Types
import type { ParagraphContentField } from "@/@types/Description";

interface ParagraphFieldValidatorParams {
    field: ParagraphContentField;
    index: number;
    splitted?: boolean;
}

export default class ParagraphFieldValidator extends SingleFieldValidatorAbstract {
    public constructor(props: ParagraphFieldValidatorParams) {
        super({
            field: props.field,
            index: props.index,
            requiredProperties: ["type", "content"],
            restrictions: props.splitted ? restrictions.splittedParagraph : restrictions.paragraph,
            textToValidate: props.field.content,
        });
    }
}
