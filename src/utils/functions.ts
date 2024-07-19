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
    acc = `${array[0] === element ? "?" : ""}${acc}${element}=${trimmedPayload[element]
      }${array[array.length - 1] !== element ? "&" : ""}`;

    return acc;
  }, "");

  return queryString;
}


interface Item {
  itemId: string;
  quantity: number;
}

interface ItemDetail {
  _id: string;
  name: string;
  image: string;
  categoryName: string;
  unitPrice: number;
  whiteLabelName: string;
  createdBy: string;
  __v: number;
}

interface MergedItem extends Item, Omit<ItemDetail, '_id'> { }

export function mergeItemsWithDetails(items: Item[], itemDetails: ItemDetail[]): MergedItem[] {
  // Create a dictionary from itemDetails for quick lookup
  const itemDetailsDict: { [key: string]: ItemDetail } = itemDetails.reduce((dict, itemDetail) => {
    dict[itemDetail._id] = itemDetail;
    return dict;
  }, {} as { [key: string]: ItemDetail });

  // Merge items with itemDetails
  return items.map(item => {
    const detail = itemDetailsDict[item.itemId];
    if (detail) {
      return {
        ...item,
        name: detail.name,
        image: detail.image,
        categoryName: detail.categoryName,
        unitPrice: detail.unitPrice,
        whiteLabelName: detail.whiteLabelName,
        createdBy: detail.createdBy,
        __v: detail.__v
      };
    } else {
      throw new Error(`Item with ID ${item.itemId} not found in itemDetails.`);
    }
  });
}

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
}

export const generateSerialNumber = (index: number, pageInfo: PaginationInfo): number => {
  const { currentPage, pageSize } = pageInfo;
  return (currentPage - 1) * pageSize + index + 1;
};

// Example usage

