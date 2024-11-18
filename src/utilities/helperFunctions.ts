import { AES, enc } from "crypto-js";
import { Config } from "./config";
import { format, formatDistanceToNow } from "date-fns";




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

export const formatDateBlog = (date: string) => {
  const dateObj = new Date(date);

  // Format the date
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};


const formatReadingTime = (minutes: number) => {
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

export const calculateReadingTime = (htmlContent: string) => {
  const wordsPerMinute = 200; // Average reading speed (words per minute)

  const text = stripHtml(htmlContent);

  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;

  const readingTimeInMinutes = wordCount / wordsPerMinute;

  return formatReadingTime(readingTimeInMinutes);
};

export function formatAmount(amount: number): string {
  // Check if the amount is a valid number
  if (isNaN(amount) || !isFinite(amount)) {
    return "Invalid amount";
  }

  // Format the amount as NGN with two decimal places
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2
  }).format(amount);

  return formattedAmount;
}


export function fDate(date: string) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function fDateTime(date: string) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fDateTimeSuffix(date: string) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date: string) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function formatDate(currentDate: string) {
  const [date, time] = currentDate.replace("T", " ").split(" ");
  //  console.log(date, time+":00");
  return `${date} ${time}:00`;
}

export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0) ||
  (typeof value === "object" && value.toString().length === 0);

  export function fDate(date: string) {
    return format(new Date(date), "dd MMMM yyyy");
  }