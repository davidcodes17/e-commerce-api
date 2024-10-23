import jwt from "jsonwebtoken";

interface Payload {
  _id?: string;
}

const generate = async (payload: Payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

const verify = async (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    // console.log(error.message)
    return null;
  }
};

export { generate, verify };
