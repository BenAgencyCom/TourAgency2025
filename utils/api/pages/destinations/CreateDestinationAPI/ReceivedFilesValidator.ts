// Tools
import { InvalidRequestedBody } from "@/utils/api/Errors";
// Types
import { FieldType } from "@/@types/Description";
import type { ParsedRequestBody } from "./@types";
import type { SubmittedFilesCollection } from "@/utils/api/HandleMultipartFormDataRequest";

/** This class is resposible for ensuring that all received in the
 * request files are adequate and expected by remaining part of the data
 * - The only argument is an object containing parsed fields and files
 * - Throwns `InvalidRequestedBody` immediately after any issue is detected
 * */
export default class ReceivedFilesValidator {
    protected files: SubmittedFilesCollection;
    protected fields: ParsedRequestBody;
    protected readonly SUPPORTED_TYPES: string[] = [];

    public constructor(props: { files: SubmittedFilesCollection; fields: ParsedRequestBody }) {
        this.fields = props.fields;
        this.files = props.files;
    }

    public validate() {
        const expectedImages = this.establishExpectedImages();
        const receivedImages = this.establishReceivedImages();
        //
        this.compareRequiredWithExpected({ expectedImages, receivedImages });
    }

    /** Establish all expected images */
    protected establishExpectedImages(): string[] {
        const expected: string[] = ["thumbnail"];
        for (const field of this.fields.description) {
            if (field.type === FieldType.IMAGE) expected.push(field.url as string);
            else if (field.type === FieldType.SPLITTED) {
                if (field.left.type === FieldType.IMAGE) expected.push(field.left.url as string);
                if (field.right.type === FieldType.IMAGE) expected.push(field.right.url as string);
            }
        }
        return expected;
    }

    /** Establish all received images */
    protected establishReceivedImages(): string[] {
        const received: string[] = [];
        for (const image in this.files) {
            received.push(image);
        }
        return received;
    }

    /** Compare received and expected images with each other*/
    protected compareRequiredWithExpected(props: { expectedImages: string[]; receivedImages: string[] }) {
        const { expectedImages, receivedImages } = props;

        expectedImages.forEach((expectedImage: string) => {
            if (!receivedImages.includes(expectedImage)) {
                throw new InvalidRequestedBody([
                    {
                        element: expectedImage,
                        type: "required",
                        message: "The image is required but has not been provided",
                    },
                ]);
            }
        });
    }
}
