import { Request, Response } from "express";
import UploadFly from "../../config/uploadfly";
import mainConfig from "../../config/main";
import Seller from "../../models/Seller";
import errorHandler from "../../utils/errorHandler";

export default async (req: Request, res: Response) => {
  const { file } = req;

  if (!file) {
    return res
      .status(400)
      .json({ error: "A 'shop_icon' image must be provided." });
  }

  try {
    const upload = await UploadFly.upload(file);
    if (upload.data.success) {
      await Seller.update(
        {
          shop_icon: upload.data.data.url,
        },
        {
          where: {
            user_id: (req.user as any)?.uuid,
          },
        }
      );
      return res.status(mainConfig.status.ok).json({
        msg: "Shop Icon Uploaded Sucessfully",
        data: {
          shop_icon: upload.data.data.url,
        },
      });
    }

    return res.status(mainConfig.status.bad).json({
      msg: "Could Not Upload Shop Icon",
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};
