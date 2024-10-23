import { Request, Response } from "express";
import errorHandler from "../../utils/errorHandler";
import AddressBook from "../../models/AddressBook";
import mainConfig from "../../config/main";

export default async (req: Request | any, res: Response) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      phone,
      additionalPhone,
      country,
      city,
      region,
    } = req.body;
    const getAd = await AddressBook.findOne({
      where: {
        id,
        user_id: req.user.uuid,
      },
    });

    if(!getAd){
      return res.status(mainConfig.status.bad).json({
        msg:"No address found with specified ID"
      })
    }

    const address = await AddressBook.update(
      {
        firstName,
        lastName,
        phone,
        additional_phone: additionalPhone,
        city,
        country,
        region,
      },
      {
        where: {
          id,
          user_id: req.user.uuid,
        },
      }
    );
    return res.status(mainConfig.status.ok).json({
      msg: "Address Updated successfully",
      data: {
        id,
        firstName,
        lastName,
        phone,
        additional_phone: additionalPhone,
        city,
        country,
        region,
      },
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};
