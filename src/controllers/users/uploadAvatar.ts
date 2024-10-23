import { Request, Response } from "express";
import UploadFly from "../../config/uploadfly";
import { randomID } from "../../utils/numbers";
import mainConfig from "../../config/main";
import User from "../../models/User";
import errorHandler from "../../utils/errorHandler";

export default async (req: Request, res: Response) => {
  const { file } = req;

  if (!file) {
    return res
      .status(400)
      .json({ error: "A 'avatar' image must be provided." });
  }

  try {
    const upload = await UploadFly.upload(file);
    if (upload.data.success) {
      await User.update(
        {
          avatar: upload.data.data.url,
          avatarId: "uploadfly",
        },
        {
          where: {
            uuid: (req.user as any)?.uuid,
          },
        }
      );
      return res.status(mainConfig.status.ok).json({
        msg: "Avatar Uploaded Sucessfully",
        data: {
          avatar: upload.data.data.url,
        },
      });
    }

    return res.status(mainConfig.status.bad).json({
      msg: "Could Not Upload Avatar",
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};
