import { Request, Response } from "express";
import Cart from "../../models/Cart";
import mainConfig from "../../config/main";
import { fetchCart } from "../../utils/carts";
import errorHandler from "../../utils/errorHandler";
import Product from "../../models/Product";
import { nanoid } from "nanoid";

export default async (req: Request | any, res: Response) => {
  try {
    // REQ: qty, product_id
    if ( req.body.quantity === "0") {
      await Cart.destroy({
        where: {
          user_id: req.user.uuid,
          product_id: req.body.product_id,
        },
      });
      return res.status(mainConfig.status.ok).json({
        msg: "Cart Removed",
      });
    }
    const existing_cart = await fetchCart(req);
    const products = await Product.findOne({
      where: {
        uuid: req.body.product_id,
      },
    });

    if (
      Number(products?.get().quantity || 0) <
      Number(
        req.body.quantity || Number(existing_cart?.get().quantity || 0) + 1
      )
    ) {
      return res.status(mainConfig.status.bad).json({
        msg: "Maximum Product Quantity Exceeded",
        data:{
          quantity:existing_cart && existing_cart.get().quantity
        }
      });
    }
    if (existing_cart) {
      await Cart.update(
        {
          quantity: req.body.quantity || existing_cart.get().quantity + 1,
        },
        {
          where: {
            user_id: req.user.uuid,
            product_id: req.body.product_id,
          },
        }
      );

      const updated_cart = await fetchCart(req);

      return res.status(mainConfig.status.ok).json({
        msg: "Cart Updated Successfully",
        data: updated_cart?.get(),
      });
    }

    const cart = await Cart.create({
      user_id: req.user.uuid,
      uuid:nanoid(),
      product_id: req.body.product_id,
      quantity: req.body.quantity || 1,
    });
    return res.status(mainConfig.status.ok).json({
      msg: "Cart Created Successfully",
      data: cart?.get(),
    });
  } catch (error) {
    console.log(error)
    return errorHandler(res, error);
  }
};
