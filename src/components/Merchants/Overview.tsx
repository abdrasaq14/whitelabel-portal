import { fDate, getStatusById } from "@/utilities/helperFunctions";
import StarRating from "../feedbacks/StarRating";
import CopyToClipboard from "../feedbacks/CopytoClipboard";
import useStorage from "@/customHooks/useStorage";

const Overview = ({ merchant }: { merchant: any }) => {
  console.log("overviewMerchant", merchant);
  const { currentUser } = useStorage();
  return (
    <div className="w-full grid grid-cols-2 gap-3">
      <div className="w-full px-6 py-6 rounded border h-[504px] bg-white">
        {merchant && (
          <div className="w-full">
            <div className="mt-2 w-auto">
              <p className="font-medum font-satoshiMedium text-sm text-accent-darker">
                Status
              </p>
              <p className={`mt-1  text-sm font-medum font-satoshiMedium   `}>
                {merchant && merchant?.platformAccess && (
                  <span
                    className={`px-2 py-1 rounded-md   ${
                      getStatusById(
                        merchant?.platformAccess,
                        currentUser?.user?.whiteLabelName.toUpperCase()
                      ) == "active"
                        ? "bg-green-300 text-green-900"
                        : "text-red-900 bg-red-300"
                    }`}
                  >
                    {getStatusById(
                      merchant?.platformAccess,
                      currentUser?.user?.whiteLabelName.toUpperCase()
                    )}
                  </span>
                )}
              </p>
            </div>
            <div>
              <div className="mt-2">
                <p className="font-medum font-satoshiMedium text-sm text-accent-darker">
                  Rating
                </p>
                <div className="flex gap-2 items-center mt-1">
                  <p className=" text-accent-light text-base font-medum font-satoshiMedium">
                    {merchant?.rating}/5
                  </p>
                  <StarRating totalRatings={merchant?.rating} />
                </div>
              </div>
              <div className="mt-2">
                <p className="font-medum font-satoshiMedium text-sm text-accent-darker">
                  Store Name
                </p>
                <p className="mt-1 text-accent-light text-base font-medum font-satoshiMedium ">
                  {merchant?.businessName}
                </p>
              </div>
              <div className="mt-2">
                <p className="font-medum font-satoshiMedium text-sm text-accent-darker">
                  Store Link
                </p>
                <div className=" flex justify-between w-full">
                  <p className="text-accent-light text-base font-medum font-satoshiMedium">
                    {merchant?.storeLink}
                  </p>
                  <CopyToClipboard text={merchant?.storeLink} />
                </div>
              </div>
              <div className="mt-2 w-full">
                <p className="font-medum font-satoshiMedium text-sm text-accent-darker">
                  Product Categories
                </p>
                <h3>{merchant?.category}</h3>
              </div>
              <div className="mt-2">
                <p className="font-medum font-satoshiMedium text-sm text-accent-darker">
                  Location
                </p>
                <p className="mt-1 text-accent-light text-base font-medum font-satoshiMedium "></p>
              </div>
              <div className="mt-2">
                <p className="font-medum font-satoshiMedium text-sm text-accent-darker">
                  Store Address
                </p>
                <p className="mt-1 text-accent-light text-base font-medum font-satoshiMedium ">
                  {merchant?.location?.address}
                </p>
              </div>
              <div className="mt-2">
                <p className="font-medum font-satoshiMedium text-sm text-accent-darker">
                  Date Joined
                </p>
                <p className="mt-1 text-accent-light text-base font-medum font-satoshiMedium ">
                  {merchant?.createdAt && fDate(merchant?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex-col flex gap-3 w-full">
        <div className="w-full bg-white border rounded p-6 h-[176px]"></div>
        <div className="w-full bg-white border rounded p-6 h-[176px]"></div>
      </div>
    </div>
  );
};

export default Overview;
