// Tools
import { ValidationError } from "@/utils/api/Errors";
import ReceivedFilesValidator from "./ReceivedFilesValidator";
import handleMultipartFormDataRequest from "@/utils/api/handleMultipartFormDataRequest";
// Types
import type { NextApiRequest } from "next";
import type { ParsedRequestBody } from "./@types";
import type { SubmittedFilesCollection } from "@/utils/api/handleMultipartFormDataRequest";

export default class CreateLandmarkAPI {
    /** Object containing parsed data, alike to express's `req.body` */
    protected fields: ParsedRequestBody = {} as ParsedRequestBody;
    /** Object containing parsed images, alike to express's `req.files` */
    protected files: SubmittedFilesCollection = {} as SubmittedFilesCollection;

    public constructor(protected req: NextApiRequest) {}

    public async main() {
        await this.parseRequest();
        await this.handleValidation();
        return true;
    }

    /** Parse comming request in order to obtain an access to the JSON body and images */
    protected async parseRequest() {
        const parsedRequest = await handleMultipartFormDataRequest<ParsedRequestBody>(this.req);
        parsedRequest.fields.description = JSON.parse(parsedRequest.fields.description as unknown as string);
        this.fields = parsedRequest.fields;
        this.files = parsedRequest.files;
    }

    /** Handle all processes related with validation each single property as well as images */
    protected async handleValidation() {
        new ReceivedFilesValidator({
            files: this.files,
            fields: this.fields,
        }).main();
    }
}
