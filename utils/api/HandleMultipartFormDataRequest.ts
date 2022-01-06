// Libraries
import path from "path";
import formidable from "formidable";
import type { Fields, Files } from "formidable";
// Types
import type { NextApiRequest } from "next";
// My helpers
import { uploadDir } from "@/utils/paths";
import { InvalidRequestedBody } from "@/utils/api/Errors";

export type FilesFromMultipartFormData = Record<string, { originalFilename: string; filepath: string }>;
interface MultipartFormData<T> {
    fields: T;
    files: FilesFromMultipartFormData;
}

const handle = async <T>(req: NextApiRequest): Promise<MultipartFormData<T>> =>
    await new Promise((resolve, reject) => {
        try {
            const form = new formidable.IncomingForm({ uploadDir: path.join(uploadDir, "temp") });
            form.parse(req, async (err, fields, files) => {
                resolve({
                    fields: fields as unknown as T, //
                    files: files as unknown as FilesFromMultipartFormData,
                });
            });
        } catch (e: unknown) {
            throw new InvalidRequestedBody();
        }
    });

export default handle;
