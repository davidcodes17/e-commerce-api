import axios from "axios";
import { PaymentLinkType } from "../types/config";
import { nanoid } from "nanoid";
import Transactions from "../models/Transactions";

const API_ENDPOINT = "https://api.flutterwave.com/v3/payments";

class FLW {
  static async PaymentLink({
    tx_ref = nanoid(40) ,
    amount,
    currency,
    meta,
    uuid,
    customer,
    user_id
  }: PaymentLinkType) {
    try {
      const response = await axios.post(
        API_ENDPOINT,
        {
          tx_ref: tx_ref ,
          amount,
          currency,
          redirect_url: `${process.env.BACKEND_BASE_URL}/webhooks/flutter`,
          meta,
          customer,
          customizations: {
            title: "All Stars Solution Payments",
            logo: `${process.env.BACKEND_BASE_URL}/assets/logo.png`,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          },
        }
      );
      if (response.statusText == "OK") {
       const tx= await Transactions.create({
          user_id,
          uuid,
          type:"flutter-wave",
          amount,
          summary:meta.summary,
          currency,
          ref:tx_ref
        })
        tx.save();
        return response.data;
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}

export default FLW;
