import Cart from "../models/Cart";

export const fetchCart = async (req: Request | any, type: "all" | "one"="one"):Promise<any> => {
  if (type == "all") {
    const existing_cart = await Cart.findAll({
      where: {
        user_id: req.user.uuid,
        // product_id: req.body.product_id,
      },
      attributes:["product_id","quantity","price", "createdAt"]
    });
    return existing_cart;
  }

  const existing_cart = await Cart.findOne({
    where: {
      user_id: req.user.uuid,
      product_id: req.body.product_id,
    },
  });
  return existing_cart;
};
