// Tools
import SingleFieldValidatorAbstract from "./SingleFieldValidatorAbstract";
// Types
import type { ImageContentField } from "@/@types/Description";

interface ImageFieldValidatorParams {
    field: ImageContentField;
    index: number;
}

export default class ImageFieldValidator extends SingleFieldValidatorAbstract {
    public constructor(props: ImageFieldValidatorParams) {
        super({
            field: props.field,
            index: props.index,
            requiredProperties: ["type", "src", "url"],
            restrictions: { min: 3, max: 255 },
            textToValidate: props.field.url as string,
        });
    }
}
