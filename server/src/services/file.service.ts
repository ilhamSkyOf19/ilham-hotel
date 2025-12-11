import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
import { access, unlink } from "fs/promises";
import multer, { FileFilterCallback, Multer } from "multer";
import path from "path";

export class FileService {
  // upload
  static upload(pathname: string, name: string): Multer {
    // create storage for multer
    const storage = multer.diskStorage({
      // destination
      destination: function (
        _req: Request,
        _file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
      ) {
        // initialize folder for upload
        // base folder
        const baseFolder = path.join(__dirname, "../../public/uploads");
        const upload: string = path.join(baseFolder, pathname);

        // check folder upload
        if (!existsSync(baseFolder)) {
          // create folder uploads
          mkdirSync(baseFolder, {
            recursive: true,
          });
        }
        // check existing folder
        if (!existsSync(upload)) {
          // create folder folder destination
          mkdirSync(upload, {
            recursive: true,
          });
        }

        // callback
        cb(null, upload);
      },

      //   filename
      filename: function (
        _req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
      ) {
        // generate uniq for pathname
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        // callback
        cb(
          null,
          name +
            "-" +
            uniqueSuffix +
            path.extname(file.originalname).toLowerCase()
        );
      },
    });
    //   file filter
    const fileFilter = (
      _req: Request,
      file: Express.Multer.File,
      cd: FileFilterCallback
    ): void => {
      // allow ext
      const allowMimeTypes: string[] = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      // cek
      if (allowMimeTypes.includes(file.mimetype)) {
        cd(null, true);
      } else {
        cd(new Error("Invalid file type"));
      }
    };

    // upload
    return multer({
      storage,
      fileFilter,
      limits: { fileSize: 2 * 1024 * 1024 }, // max 2MB
    });
  }

  //   delete file from request
  static async deleteFileFromRequest(filePath: string): Promise<void> {
    try {
      // cek file
      await access(filePath);

      // delete file
      await unlink(filePath);

      // log
      console.log(`File at ${filePath} deleted successfully.`);
    } catch (error) {
      console.log(`File at ${filePath} does not exist or cannot be accessed.`);
    }
  }
}
