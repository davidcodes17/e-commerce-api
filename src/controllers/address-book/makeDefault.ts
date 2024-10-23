import { Request, Response } from "express";
import errorHandler from "../../utils/errorHandler";
import AddressBook from "../../models/AddressBook";
import mainConfig from "../../config/main";

export default async (req: Request | any, res: Response) => {
  try {
    const { id } = req.params;
    const allAddress = await AddressBook.findAll({
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
        "isDefault",
      ],
    });

    const addressExists = await AddressBook.findAndCountAll({
        where:{
            id,
            user_id: req.user.uuid,
        }
    })

    if(!allAddress || addressExists.count == 0){
        return res.status(mainConfig.status.bad).json({
            msg:"No address found"
        })
    }

    // change existing default to false
    await AddressBook.update(
      {
        isDefault: false,
      },
      {
        where: {
          user_id: req.user.uuid,
          isDefault: true,
        },
      }
    );

    // set the new default
    await AddressBook.update(
      {
        isDefault: true,
      },
      {
        where: {
          id,
          user_id: req.user.uuid,
        },
      }
    );

    const address = allAddress.filter((ad) => ad.get().id == id)[0];

    return res.status(mainConfig.status.ok).json({
      msg: `Set Address-${id} as Default`,
      data: {...address.dataValues,isDefault:true},
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};
