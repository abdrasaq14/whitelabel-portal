import { AES, enc } from "crypto-js";
import { Config } from "./config";
import parse from "html-react-parser";
import { htmlToText } from "html-to-text";

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
    const bytes = AES.decrypt(data, $key);
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

export const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

export const handleError = (error: any) => {
  if (
    error?.code === "ERR_NETWORK" ||
    error?.message?.includes("Network Error") ||
    error?.message?.includes("Failed to fetch") ||
    error?.message?.includes("Cannot read properties of undefined")
  ) {
    return "Network error";
  } else if (error.response.data.message) {
    const message = error.response.data.message;
    return message === "Invalid token"
      ? "Session expired, kindly login again"
      : message;
  } else if (error?.message) {
    return error.message == "Invalid token"
      ? "Session expired, kindly login again"
      : error.message;
  } else {
    return error ?? "An unexpected error occurred.";
  }
};

const formatReadingTime = (minutes:number) => {
  if (minutes < 1) {
    // If reading time is less than 1 minute, round up and show in seconds
    const seconds = Math.ceil(minutes * 60);
    return `${seconds} seconds`;
  } else if (minutes >= 60) {
    // If reading time is more than 60 minutes, show hours and minutes
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.ceil(minutes % 60); // Round up remaining minutes
    return remainingMinutes > 0
      ? `${hours} hours and ${remainingMinutes} minutes`
      : `${hours} hours`;
  } else {
    // For reading time less than 60 minutes, round up and show in minutes
    return `${Math.ceil(minutes)} minutes`;
  }
};

export const calculateReadingTime = (htmlContent:string) => {
  const wordsPerMinute = 200; // Average reading speed (words per minute)

  const text = stripHtml(htmlContent);

  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;

  const readingTimeInMinutes = wordCount / wordsPerMinute;

  return formatReadingTime(readingTimeInMinutes);
};


export const customHTMLParser = (str: any) => {
  console.log("CustomPArser", str)
  const decoded = parse(str);
  const cleanString = htmlToText(decoded.toString(), {
    wordwrap: 130,
  });
  return cleanString;
};