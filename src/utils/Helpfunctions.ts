import { AES, enc } from "crypto-js";
import { Config } from "./config";


export const decodeHtml = (html: any) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }


export function formatAmount(amount: number): string {
  // Check if the amount is a valid number
  if (isNaN(amount) || !isFinite(amount)) {
    return 'Invalid amount';
  }

  // Format the amount as NGN with two decimal places
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(amount);

  return formattedAmount;
}

const $key: string = Config.encodingKey ?? "$@A^&GHDQW$@!@#";

export const encrypt = (data: string) => {
  return AES.encrypt(data, $key).toString();
};

export const decrypt = (data: string) => {
  if (data) {
    var bytes = AES.decrypt(data, $key);
    return JSON.parse(bytes.toString(enc.Utf8));
  }

  return null;
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);

// Format the date
return dateObj.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
}

export const truncateText = (text:string, maxLength = 150) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
export const stripHtml = (str: any) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = str;
  const textContent = tempDiv.textContent || tempDiv.innerText || "";
  return textContent.trim();
};