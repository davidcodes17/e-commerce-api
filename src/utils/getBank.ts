import banks from "../resources/banks";
import { BankType } from "../types/resources";

const getBankCode = (name: string): BankType | void => {
  for (const key of Object.keys(banks)) {
    if (key === name.toLowerCase()) {
      return banks[key];
    }
  }

  return;
};

export default getBankCode;
