import { IoCopyOutline } from "react-icons/io5";
import { useAuth } from "../../../zustand/auth.store";
import { toast } from "react-hot-toast";
function InviteMerchant() {
    const whiteLabelName = useAuth(
    // @ts-ignore
    (s) => s.profile.whiteLabelName
  );
 const handleCopyLink = () => {
   const textToCopy = `https://www.profitall.co.uk/onboarding?whiteLabelName=${whiteLabelName}`;
   navigator.clipboard
     .writeText(textToCopy)
     .then(() => {
        toast.success("Link copied to clipboard");
     })
     .catch((err) => {
       console.error("Failed to copy: ", err);
     });
 };
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-6 ">
      <div className=" basis-2/3 flex-grow ">
        <h2 className="text-base font-satoshiBold  font-semibold text-primary-text">
          Invite Merchant
        </h2>
        <p className="mt-2 text-sm font-satoshiRegular font-normal text-[#2B2C34]">
          Invite merchants or vendors to sell on your marketplace with ease!
          Simply copy and share this invitation link with them. This link will
          grant them access to register and start selling on your marketplace.
          Alternatively, you can copy and share the link through email, social
          media, or messaging apps. Get started now and expand your marketplace
          community!"
        </p>
      </div>

      <div className="basis 1/3 min-w-[10%] flex items-center justify-center">
        <button
          type="button"
          onClick={handleCopyLink}
          className="rounded-lg p-4 flex gap-2 items-center justify-center border-[0.45px] border-foundation-darkPurple max-h-[40px] max-w-[140px] text-foundation-darkPurple hover:bg-foundation-darkPurple hover:text-white"
        >
          Copy <IoCopyOutline />
        </button>
      </div>
    </div>
  );
}

export default InviteMerchant;
