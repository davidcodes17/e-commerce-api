import dotenv from "dotenv"
dotenv.config();
import sendEmail from "../src/utils/sendEmail";

describe("Emails", () => {
  it("Should send a test email", async () => {
    const email = await sendEmail({
      to: "timileyinoyelekan@gmail.com",
      subject: "Test Env",
      path:"src/emails/welcome.ejs",
      data:{
          URL:process.env.BACKEND_BASE_URL,
          name:"OT"
      }
    });
    expect(email).not.toMatch("Message not Sent");
  });
});
