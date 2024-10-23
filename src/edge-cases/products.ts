import { createId } from "@paralleldrive/cuid2";
import Product from "../models/Product";

import {faker} from "@faker-js/faker"

export const generateRandomProducts = async()=> {
  for (let i = 0; i < 100; i++) {
    console.log("[CREATING PRODUCTS]", i)
    const product =await Product.create({
      name: faker.commerce.productName(),
      uuid: createId(),
      category: faker.commerce.department(),
      thumbnail: faker.image.url(),
      other_images: faker.image.url() + ',' + faker.image.url() + ',' + faker.image.url(),
      quantity: faker.number.int({max:20}),
      percentage_discount: faker.number.int({max:100}) + '%',
      price: String(faker.commerce.price({max:10000})),
      old_price: String(faker.commerce.price({max:10000})),
      description: faker.lorem.paragraph(),
      description_type:"TEXT",
      delivery_regions: faker.location.city() + ',' + faker.location.city() + '' + faker.location.city(),
    });
    await product.save()
  }
}

