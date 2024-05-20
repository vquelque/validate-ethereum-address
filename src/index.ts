import { ValidInputTypes, isHexStrict, isUint8Array } from "./utils";
import { keccak_256 } from "@noble/hashes/sha3";
import { bytesToHex as toHex } from "@noble/hashes/utils";

export const checkAddressChecksum = (data: string): boolean => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(data)) return false;
  const address = data.slice(2);
  const addressHash = toHex(keccak_256(address.toLowerCase()));
  console.log(addressHash);

  for (let i = 0; i < 40; i += 1) {
    if (
      (parseInt(addressHash[i], 16) > 7 &&
        address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 &&
        address[i].toLowerCase() !== address[i])
    ) {
      return false;
    }
  }
  return true;
};

export const isAddress = (
  value: ValidInputTypes,
  checkChecksum = true,
): boolean => {
  if (typeof value !== "string" && !isUint8Array(value)) {
    return false;
  }

  let valueToCheck: string;

  if (isUint8Array(value)) {
    valueToCheck = Buffer.from(value).toString("hex");
  } else if (typeof value === "string" && !isHexStrict(value)) {
    valueToCheck = value.toLowerCase().startsWith("0x") ? value : `0x${value}`;
  } else {
    valueToCheck = value;
  }

  if (!/^(0x)?[0-9a-f]{40}$/i.test(valueToCheck)) {
    return false;
  }

  if (
    /^(0x|0X)?[0-9a-f]{40}$/.test(valueToCheck) ||
    /^(0x|0X)?[0-9A-F]{40}$/.test(valueToCheck)
  ) {
    if (checkChecksum) {
      return false;
    } else {
      return true;
    }
  }

  return checkChecksum ? checkAddressChecksum(valueToCheck) : true;
};
