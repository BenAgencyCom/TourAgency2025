// Tools
import { prisma } from "@/prisma/db";
import FieldsValidator from "./FieldsValidator";
import slugGenerator from "@/utils/api/slugGenerator";
import FileUploader from "@/utils/api/abstracts/FileUploader";
import ReceivedFilesValidator from "./ReceivedFilesValidator";
import handleMultipartFormDataRequest from "@/utils/api/HandleMultipartFormDataRequest";
// Types
import type { NextApiRequest } from "next";
import type { ParsedRequestBody } from "./@types";
import type { SubmittedFilesCollection } from "@/utils/api/HandleMultipartFormDataRequest";

export default class CreateLandmarkAPI extends FileUploader {
    /** Object containing parsed data, alike to express's `req.body` */
    private fields: ParsedRequestBody = {} as ParsedRequestBody;
    /** Object containing parsed images, alike to express's `req.files` */
    private files: SubmittedFilesCollection = {} as SubmittedFilesCollection;
    private folderName: string = "";

    public constructor(private req: NextApiRequest, private creatorID: string) {
        super(["360p", "480p", "720p", "1080p"]);
    }

    public async main() {
        await this.parseRequest();
        await this.handleValidation();
        this.generateFolderName();
        await this.saveThumbnail();
        await this.saveDescriptionImages();
        await this.storeNewLandmarkInDatabase();
    }

    /**
     *  Parse comming request in order to obtain an access to the JSON body and images
     */
    private async parseRequest() {
        const parsedRequest = await handleMultipartFormDataRequest<ParsedRequestBody>(this.req);
        if (parsedRequest.fields.description) parsedRequest.fields.description = JSON.parse(parsedRequest.fields.description as any);
        this.fields = parsedRequest.fields;
        this.files = parsedRequest.files;
    }

    /**
     * Handle all processes related with validation each single property as well as images
     */
    private async handleValidation() {
        await new FieldsValidator(this.fields).validate();

        new ReceivedFilesValidator({
            files: this.files,
            fields: this.fields,
        }).validate();
    }
    /**
     * Generate `landmark.folder`, which is going to be further used by image storing methods
     */
    private generateFolderName() {
        this.folderName = slugGenerator(`${this.fields.title}_${this.fields.destinationId}_`, true).slice(0, 255);
    }
    /**
     * Returns `slug` of destination reflecting `this.fields.destinationId`
     */
    private async getDestinationSlug(): Promise<string> {
        return (
            (await prisma.destination.findUnique({
                where: { id: this.fields.destinationId },
                select: { slug: true },
            })) as any
        ).slug;
    }

    private async saveThumbnail() {
        await this.uploadSingleFile({
            file: this.files["thumbnail"],
            savePath: `/landmarks/${this.folderName}/thumbnail`,
        });
    }

    private async saveDescriptionImages() {
        for (const imageName in this.files) {
            if (imageName === "thumbnail") continue;

            await this.uploadSingleFile({
                file: this.files[imageName],
                savePath: `/landmarks/${this.folderName}/description/${imageName}`,
            });
        }
    }

    private async storeNewLandmarkInDatabase() {
        const destinationSlug = await this.getDestinationSlug();
        const slug = slugGenerator(`${destinationSlug}_${this.fields.title}`, false);

        await prisma.landmark.create({
            data: {
                destinationId: this.fields.destinationId,
                description: this.fields.description as any,
                folder: this.folderName,
                shortDescription: this.fields.shortDescription,
                slug,
                title: this.fields.title,
                title_lowercase: this.fields.title.toLowerCase(),
                type: this.fields.type,
                creatorId: this.creatorID,
            },
        });
    }
}
