import Flutterwave from "flutterwave-node-v3";
import { nanoid } from "nanoid";
import { flutterWaveTransferTypes } from "../types/utils";



export const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const flutterWaveTransfer = async ({
  account_bank,
  account_number,
  amount,
  currency,
  narration,
  reference,
}: flutterWaveTransferTypes) => {
  try {
    const details = {
      account_bank,
      account_number,
      amount,
      currency,
      narration,
      reference: reference || nanoid(40),
    };
  const flw_transer =  await flw.Transfer.initiate(details)
  console.log(flw_transer)
  } catch (error) {
    console.log(error)
  }
};


export default flutterWaveTransfer