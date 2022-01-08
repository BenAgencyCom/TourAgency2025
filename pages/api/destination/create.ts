// Libraries
import GuardedAPIEndpoint from "@/utils/api/GuardedAPIEndpoint";
import HandleMultipartFormDataRequest from "@/utils/api/HandleMultipartFormDataRequest";
// Types
import { prisma } from "@/prisma/db";
import type { User } from "@prisma/client";
import type { NextApiResponse } from "next";
import { CreateDestinationRequest, CreateDestinationRequestPardesBody } from "@/@types/router/destination";
import type { SubmittedFilesCollection, SubmittedFile } from "@/utils/api/HandleMultipartFormDataRequest";
// Helpers
import FileUploader from "@/utils/api/abstracts/FileUploader";
import { Forbidden } from "@/utils/api/Errors";
import slugGenerator from "@/utils/api/slugGenerator";
//
class CreateNewDestination extends FileUploader {
    private readonly folderName: string;
    // Images
    private thumbnail: SubmittedFile;
    private descriptionImagesCollection: SubmittedFilesCollection = {};
    private landmarksImagesCollection: SubmittedFilesCollection = {};
    // Constructor
    public constructor(private fields: CreateDestinationRequestPardesBody, files: SubmittedFilesCollection, private userId: string) {
        super(["360p", "480p", "720p", "1080p"]);

        this.folderName = slugGenerator(`${fields.country.label}_${fields.city}`, true).slice(0, 200);
        this.thumbnail = files["thumbnail"];

        // Distinguish whether image is related to description or landmarks
        for (const imageName in files) {
            if (imageName.includes("description_")) this.descriptionImagesCollection[imageName] = files[imageName];
            else if (imageName.includes("landmark_")) this.landmarksImagesCollection[imageName] = files[imageName];
        }

        // Prepare landmakrs
        const { city } = fields;
        fields.landmarks = fields.landmarks.map((landmark) => {
            const slug = slugGenerator(`${city}_${landmark.title.slice(0, 50)}`, true).slice(0, 200);
            this.landmarksImagesCollection[slug] = this.landmarksImagesCollection[landmark.pictureURL];
            delete this.landmarksImagesCollection[landmark.pictureURL];
            landmark.pictureURL = slug;
            return landmark;
        });
    }

    private async uploadThumbnails() {
        await this.uploadSingleFile(this.thumbnail, `destinations/${this.folderName}/thumbnail`);
    }
    private async uploadDescriptionImages() {
        const { descriptionImagesCollection } = this;
        for (const key in descriptionImagesCollection) {
            await this.uploadSingleFile(descriptionImagesCollection[key], `destinations/${this.folderName}/description/${key}`);
        }
    }
    private async uploadLandmarksImages() {
        const { landmarksImagesCollection } = this;
        for (const key in landmarksImagesCollection) {
            await this.uploadSingleFile(landmarksImagesCollection[key], `landmarks/${key}`);
        }
    }

    public async main() {
        await this.uploadThumbnails();
        await this.uploadDescriptionImages();
        await this.uploadLandmarksImages();

        const { fields } = this;
        await prisma.destination.create({
            data: {
                city: fields.city,
                continent: fields.continent,
                country: fields.country.label,
                countryCode: fields.country.code,
                description: JSON.parse(JSON.stringify(fields.description)),
                folder: this.folderName,
                population: Number(fields.population),
                shortDescription: fields.quickDescription,
                creatorId: this.userId,
                landmarks: {
                    createMany: {
                        data: fields.landmarks.map((landmark) => ({
                            description: landmark.description,
                            picture: landmark.pictureURL,
                            title: landmark.title,
                            type: landmark.type,
                            tags: landmark.tags,
                        })),
                    },
                },
            },
        });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function handler(req: CreateDestinationRequest, res: NextApiResponse) {
    try {
        const userId = (await GuardedAPIEndpoint(req, "POST", "admin")) as string;
        const { files, fields } = await HandleMultipartFormDataRequest<CreateDestinationRequest["body"]>(req);

        fields.country = JSON.parse(fields.country as string);
        fields.description = JSON.parse(fields.description as string);
        fields.landmarks = JSON.parse(fields.landmarks as string);

        await new CreateNewDestination(fields as CreateDestinationRequestPardesBody, files, userId).main();

        return res.status(201).end();
    } catch (e: unknown) {
        if (e instanceof Forbidden) return res.status(403).end();
        return res.status(500).end();
    }
}
