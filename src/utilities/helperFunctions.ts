import { AES, enc } from "crypto-js";
import { Config } from "./config";



const $key: string = Config.encodingKey ?? "$@A^&GHDQW$@!@#";
export const truncateText = (text: string, maxLength = 150) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const stripHtml = (str: any) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = str;
  const textContent = tempDiv.textContent || tempDiv.innerText || "";
  return textContent.trim();
};
export const countSpecialCharacters = (str: string): number => {
  const specialCharCount = (str.match(/[^A-Za-z0-9\s]/g) || []).length;
  return specialCharCount;
};

export const encrypt = (data: string) => {
  return AES.encrypt(data, $key).toString();
};

export const decrypt = (data: string) => {
  if (data) {
    const bytes = AES.decrypt(data, $key);
    return JSON.parse(bytes.toString(enc.Utf8));
  }

  return null;
};
