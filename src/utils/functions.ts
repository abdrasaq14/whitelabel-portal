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

export const _extractInitials = (val: string) => {
  const _first = val.split(" ")[0].slice(0, 1);
  const _second = val?.split(" ")[1]?.slice(0, 1);
  return `${_first.toLocaleUpperCase()}${_second && _second.toLocaleUpperCase()}`;
};


export function paramsObjectToQueryString(payload: any) {
  const trimmedPayload = trimObject(payload);
  const paramPayloadToArr = Object.keys(trimmedPayload);
  if (!trimmedPayload || paramPayloadToArr.length < 1) return "";
  const queryString = paramPayloadToArr.reduce((acc, element, index, array) => {
    acc = `${array[0] === element ? "?" : ""}${acc}${element}=${
      trimmedPayload[element]
    }${array[array.length - 1] !== element ? "&" : ""}`;

    return acc;
  }, "");

  return queryString;
}