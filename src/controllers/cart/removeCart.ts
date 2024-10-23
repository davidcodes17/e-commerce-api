import { Request, Response } from "express";
import Cart from "../../models/Cart";
import mainConfig from "../../config/main";
import { fetchCart } from "../../utils/carts";
import errorHandler from "../../utils/errorHandler";

export default async (req:Request | any, res:Response) => {
    try {
        await Cart.destroy({
            where:{
                user_id: req.user.uuid,
                product_id: req.body.product_id,
            }
        })
        const carts = await fetchCart(req, "all");
        return res.status(mainConfig.status.ok).json({
            msg:"Cart Deleted | Retrived new Cart Items",
            data:carts
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}