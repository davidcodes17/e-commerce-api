import { Request, Response } from "express";
import Product from "../../models/Product";
import mainConfig from "../../config/main";
import { createId } from "@paralleldrive/cuid2";
import errorHandler from "../../utils/errorHandler";
import CloudinaryUploader from "../../config/uploadfly";
export default async (req: Request | any, res: Response) => {
  const {
    name,
    category,
    quantity,
    price,
    old_price,
    currency,
    description_type,
    percentage_discount,
    description,
    delivery_regions,
  } = req.body;

  const thumbnail = req.files && req.files["thumbnail"];
  const other_images = req.files && req.files["other_images"]; // array of files ;
  if (!thumbnail || !other_images) {
    return res.status(mainConfig.status.bad).json({
      msg: "Thumbnail and Other Images is Required",
    });
  }
  try {
    const thumbnailFly = await CloudinaryUploader.upload(thumbnail[0]);
    const imageFlies = await CloudinaryUploader.uploadBulk(other_images);
    if (!thumbnailFly || !thumbnailFly.secure_url)
      return console.log("COULD NOT UPLOAD");
    Promise.all(imageFlies)
      .then(async (images: Array<string>) => {
        const uploaded_other_images = images.join(",");
        const uploaded_thumbnail = thumbnailFly.secure_url;
        const products = await Product.create({
          seller_id: req.user.uuid,
          name,
          uuid: createId(),
          category,
          quantity,
          price,
          old_price,
          description_type: description_type || "text",
          currency,
          percentage_discount,
          description,
          thumbnail: uploaded_thumbnail,
          other_images: uploaded_other_images,
        });
        products.save();
        return res.status(mainConfig.status.created).json({
          msg: "Product Created",
          data: {
            products,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(mainConfig.status.bad).json({
          msg: "Could not create Product",
        });
      });
  } catch (error) {
    console.log(error);
    return errorHandler(res, error);
  }
};
