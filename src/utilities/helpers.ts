export const isJsonString = (value: string): boolean => {
    
  try {
  
    const parsed = JSON.parse(value);
  
    return typeof parsed === 'object' && parsed !== null;
  
  } catch (error) {
  
    return false;
  
  }
  
}

export const isEmpty = (value: any) =>
  
  value === undefined ||
  
  value === null ||
  
  (typeof value === "object" && Object.keys(value).length === 0) ||
  
  (typeof value === "string" && value.trim().length === 0) ||
  
  (typeof value === "object" && value.toString().length === 0);

  
export const trimObject = (obj: any) => {
  
  for (const propName in obj) {
    
    if (isEmpty(obj[propName])) {
    
      delete obj[propName];
    
    }
  
  }

  return obj;

};

export function paramsObjectToQueryString(payload: any) {

  const trimmedPayload = trimObject(payload);

  const paramPayloadToArr = Object.keys(trimmedPayload);

  if (!trimmedPayload || paramPayloadToArr.length < 1) return "";

  const queryString = paramPayloadToArr.reduce((acc, element, index, array) => {

    acc = `${array[0] === element ? "?" : ""}${acc}${element}=${trimmedPayload[element]

    }${array[array.length - 1] !== element ? "&" : ""}`;

    return acc;

  }, "");

  return queryString;

}

export function formatDate(date: string) {
  if (!date || isNaN(new Date(date).getTime())) {
    throw new Error("Invalid date provided.");
  }

  const d = new Date(date);

  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';

  const options: any = { month: 'long', day: 'numeric', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(d);

  // Manually add the suffix to the day
  const [month, dayWithSuffix, year] = formattedDate
    .replace(/(\d+)/, `${day}${suffix}`) // Add suffix to the day
    .split(/\s|,/)                       // Split into parts
    .filter(Boolean);                    // Remove empty strings

  return `${month} ${dayWithSuffix}, ${year}`;
}

//This function is used to merge quantity to itemDetails array for Inventory history
export function mergeQuantity(itemDetails: any[], items: any[]) {
  const updatedItemDetails = itemDetails.map((detail) => {
    const matchingItem = items.find((item) => item.itemId === detail._id);
    return {
      ...detail,
      quantity: matchingItem ? matchingItem.quantity : 0, // Default to 0 if no match
    };
  });

  return updatedItemDetails;
}

export function intlFormat(amount: number, locale: string = 'en-US', currency:string = 'NGN')  {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
};