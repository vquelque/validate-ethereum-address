"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddress = exports.checkAddressChecksum = void 0;
const utils_1 = require("./utils");
const sha3_1 = require("@noble/hashes/sha3");
const utils_2 = require("@noble/hashes/utils");
const checkAddressChecksum = (data) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(data))
        return false;
    const address = data.slice(2);
    const addressHash = (0, utils_2.bytesToHex)((0, sha3_1.keccak_256)(address.toLowerCase()));
    console.log(addressHash);
    for (let i = 0; i < 40; i += 1) {
        if ((parseInt(addressHash[i], 16) > 7 &&
            address[i].toUpperCase() !== address[i]) ||
            (parseInt(addressHash[i], 16) <= 7 &&
                address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};
exports.checkAddressChecksum = checkAddressChecksum;
const isAddress = (value, checkChecksum = true) => {
    if (typeof value !== "string" && !(0, utils_1.isUint8Array)(value)) {
        return false;
    }
    let valueToCheck;
    if ((0, utils_1.isUint8Array)(value)) {
        valueToCheck = Buffer.from(value).toString("hex");
    }
    else if (typeof value === "string" && !(0, utils_1.isHexStrict)(value)) {
        valueToCheck = value.toLowerCase().startsWith("0x") ? value : `0x${value}`;
    }
    else {
        valueToCheck = value;
    }
    if (!/^(0x)?[0-9a-f]{40}$/i.test(valueToCheck)) {
        return false;
    }
    if (/^(0x|0X)?[0-9a-f]{40}$/.test(valueToCheck) ||
        /^(0x|0X)?[0-9A-F]{40}$/.test(valueToCheck)) {
        if (checkChecksum) {
            return false;
        }
        else {
            return true;
        }
    }
    return checkChecksum ? (0, exports.checkAddressChecksum)(valueToCheck) : true;
};
exports.isAddress = isAddress;
