import type { NextApiRequest } from "next";
import mime from "mime";
import { join } from "path";
import * as dateFn from "date-fns";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
    req: NextApiRequest,
    uploadDirCategory: string
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    return new Promise(async (resolve, reject) => {

        //  const uploadDir = `/run/media/open/Program/amlak-omid/public/uploads/${uploadDirCategory}/${dateFn.format(Date.now(), "dd-MM-Y")}`
        //  const uploadDir = `/run/media/open/Program/amlak-omid/public/${uploadDirCategory}/${dateFn.format(Date.now(), "dd-MM-Y")}`
        const uploadDir = join(
            process.env.ROOT_DIR || process.cwd(),
            `public/uploads/${uploadDirCategory}/${dateFn.format(Date.now(), "dd-MM-Y")}`
        );
      
        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(e);
                reject(e);
                return;
            }
        }

        const form = formidable({
            multiples: true,
            maxFiles: 5,
            // maxFileSize: 8 * 1024 * 1024, // 1mb
            maxFileSize: 20 * 1024 * 1024, // 20mb
            uploadDir,
            filename: (_name, _ext, part) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const filename = `${part.name || "unknown"}-${uniqueSuffix}.${mime.getExtension(part.mimetype || "") || "unknown"
                    }`;
                return filename;
            },
            filter: (part) => {
                return (
                    part.name === "media" && (part.mimetype?.includes("image") || false)
                );
            },
        });

        form.parse(req, function (err, fields, files) {
            if (err) reject(err);
            else resolve({ fields, files });
        });

    });
};