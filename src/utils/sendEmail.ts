import nodemailer from "nodemailer";
import ejs from "ejs";
import { SendEmailTypes } from "../types/utils";

const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  // service: "gmail",
  // port: 465,
  // // secure: true,
  // auth: {
  //   type: "OAuth2",
  //   user: "cartroyalhq@gmail.com",
  //   clientId: process.env.GOOGLE_CLIENT_ID,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //   refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  // },
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

const sendEmail = async ({ to, subject, path, data }: SendEmailTypes) => {
  try {
    const template = await ejs.renderFile(path, data, { beautify: true });
    let info = await transporter.sendMail({
      from: '"Cartroyal 😊" <info@cartroyal.com>',
      to,
      subject,
      html: template,
    });
    console.log("Message sent: >>>>>>>");
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.log("Message not Sent: <<<<<<<<<");
    return error;
  }
};

export default sendEmail;
