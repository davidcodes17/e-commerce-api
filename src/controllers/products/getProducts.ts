import { NextFunction, Response } from "express";
import Product from "../../models/Product";
import { Op } from "sequelize";
import mainConfig from "../../config/main";
import errorHandler from "../../utils/errorHandler";
import Cart from "../../models/Cart";
import { IRequest } from "../../types/express";

export default async (
  req: IRequest | any,
  res: Response,
  next: NextFunction
) => {
  const { by, order, query, limit, offset } = req.query;
  // byMe true | false :
  // order desc | asc
  //  query {string}

  if (by && by != "name") {
    return res.status(mainConfig.status.bad).json({
      msg: "'By' Query Parameter must be 'name'",
    });
  }
  const by_filter: string = (by as string) || "name";
  console.log(by_filter);
  try {
    const products = await Product.findAndCountAll({
      where: {
        [by_filter]: {
          [Op.like]: (query || "") + "%",
        },
      },
      limit: Number(Math.min(limit || 5, mainConfig.MAX_LIMIT)),
      offset: Number(offset || 0),
    });

    const productsRow = await Promise.all(
      products.rows.map(async (p) => {
        const pr_data = p.get();

        // Resolve the cart_info Promise
        const cart_info =
          req.user &&
          (await Cart.findOne({
            where: {
              product_id: pr_data.uuid,
              user_id: req.user.uuid,
            },
            attributes: ["quantity"],
          }));

        return {
          uuid: pr_data.uuid,
          seller_id: pr_data.seller_id,
          name: pr_data.name,
          price: pr_data.price,
          currency: pr_data.currency,
          quantity: pr_data.quantity,
          category: pr_data.category,
          thumbnail: pr_data.thumbnail,
          percentage_discount: pr_data.percentage_discount,
          cart: cart_info || null, // Assign cart_info or null if not found
        };
      })
    );

    return res.status(mainConfig.status.ok).json({
      msg: "Product Retrived",
      warning: !req.user && "Invalid Autorization",
      data: {
        limit: Number(limit || 5),
        offset: Number(offset || 0),
        pages: Math.floor(products.count / Number(limit || 5)),
        total: products.count,
        products: productsRow,
      },
    });
  } catch (error) {
    console.log(error);
    return errorHandler(res, error);
  }
};
