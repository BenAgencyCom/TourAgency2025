// Libraries
import path from "path";
import formidable from "formidable";
// Types
import type { NextApiRequest } from "next";
// My helpers
import { uploadDir } from "@/utils/paths";
import { InvalidRequestedBody } from "@/utils/api/Errors";

export type SubmittedFile = { originalFilename: string; filepath: string; mimetype: string };
export type SubmittedFilesCollection = Record<string, SubmittedFile>;

interface MultipartFormData<T> {
    fields: T;
    files: SubmittedFilesCollection;
}

const handle = async <T>(req: NextApiRequest): Promise<MultipartFormData<T>> =>
    await new Promise((resolve, reject) => {
        try {
            const form = new formidable.IncomingForm({ uploadDir: path.join(uploadDir, "temp") });
            form.parse(req, async (err, fields, files) => {
                resolve({
                    fields: fields as unknown as T, //
                    files: files as unknown as SubmittedFilesCollection,
                });
            });
        } catch (e: unknown) {
            throw new InvalidRequestedBody();
        }
    });

export default handle;
