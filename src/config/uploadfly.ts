import { v2 as cloudinary } from "cloudinary";
import bufferToFile from "../utils/bufferToFile"; // Assuming this utility helps convert buffer to a file
import { rm } from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export default class CloudinaryUploader {
  static async upload(file: Express.Multer.File) {
    const cloud = await cloudinary.uploader.upload(file.path);
    await rm(file.path);
    return cloud;
  }

  static async uploadBulk(files: Array<Express.Multer.File>) {
    console.log("Uploading Bulk");

    const response = await Promise.all(
      files.map(async (file, i) => {
        console.log("Uploading ", i + 1);
        const fileFly: any = await this.upload(file).then((re: any) => {
          return re.secure_url; // Getting the secure URL of the uploaded file
        });
        return fileFly;
      })
    );

    console.log("Bulk Upload Done");
    return response;
  }
}
