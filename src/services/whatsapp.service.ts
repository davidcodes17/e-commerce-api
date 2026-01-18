import axios from "axios";

export class WhatsAppService {
  private token: string;
  private phoneNumberId: string;

  constructor() {
    this.token = process.env.WHATSAPP_TOKEN!;
    this.phoneNumberId = process.env.PHONE_NUMBER_ID!;
  }

  async sendTextMessage(to: string, message: string) {
    const url = `https://graph.facebook.com/v20.0/${this.phoneNumberId}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message },
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "WhatsApp API Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}
