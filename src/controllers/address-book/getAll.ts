import { Request, Response } from "express";
import errorHandler from "../../utils/errorHandler";
import AddressBook from "../../models/AddressBook";
import mainConfig from "../../config/main";

export default async (req: Request | any, res: Response) => {
  try {
    const address = await AddressBook.findAll({
      where: {
        user_id: req.user.uuid,
      },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "phone",
        "additional_phone",
        "city",
        "country",
        "region",
        "isDefault"
      ],
    });

    if (address) {
      return res.status(mainConfig.status.ok).json({
            msg: "Address Fetched successfully",
            data:address
      });
    }

    return res.status(mainConfig.status.notFound).json({
        msg: "No Address Found for this user",
      });

    
  } catch (error) {
    return errorHandler(res, error);
  }
};
