import { cryptokey } from "@/app/lib/config";
var CryptoJS = require("crypto-js");

// Encrypt
export const encryptFunction = (value) => {
    try {
        return CryptoJS.AES.encrypt(value, cryptokey).toString();
    } catch (e) {
        return null
    }
}

// Decrypt
export const dencryptFunction = (value) => {
    try {
        var bytes = CryptoJS.AES.decrypt(value, cryptokey);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        return null
    }
}