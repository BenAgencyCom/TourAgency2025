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

export default class CreateDestinationAPI extends FileUploader {
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
        await this.saveAllImages();
        await this.storeNewDestinationInDatabase();
    }

    /**
     *  Parse comming request in order to obtain an access to the JSON body and images
     */
    private async parseRequest() {
        const parsedRequest = await handleMultipartFormDataRequest<ParsedRequestBody>(this.req);

        if (parsedRequest.fields.country) parsedRequest.fields.country = JSON.parse(parsedRequest.fields.country as any);
        if (parsedRequest.fields.description) parsedRequest.fields.description = JSON.parse(parsedRequest.fields.description as any);
        parsedRequest.fields.population = Number(parsedRequest.fields.population ?? "0");

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
     * Generate `destination.folder`, which is going to be further used by image storing methods
     */
    private generateFolderName() {
        this.folderName = slugGenerator(`${this.fields.city}_${this.fields.country.label}_`, true).slice(0, 255);
    }

    private async saveAllImages() {
        const root = `/destinations/${this.folderName}`;

        for (const imageName in this.files) {
            if (imageName === "thumbnail") {
                await this.uploadSingleFile({
                    file: this.files["thumbnail"],
                    savePath: `${root}/thumbnail`,
                });
            } else {
                await this.uploadSingleFile({
                    file: this.files[imageName],
                    savePath: `${root}/description/${imageName}`,
                });
            }
        }
    }

    private async storeNewDestinationInDatabase() {
        const { fields } = this;
        const slug = slugGenerator(`${fields.city}_${fields.country.label}`, false);

        await prisma.destination.create({
            data: {
                city: fields.city,
                continent: fields.continent,
                country: fields.country.label,
                countryCode: fields.country.code.toLowerCase(),
                description: JSON.parse(JSON.stringify(fields.description)),
                folder: this.folderName,
                population: Number(fields.population),
                shortDescription: fields.shortDescription,
                slug,
                creatorId: this.creatorID,
                city_lowercase: fields.city.toLowerCase(),
                country_lowercase: fields.country.label.toLowerCase(),
            },
        });
    }
}
