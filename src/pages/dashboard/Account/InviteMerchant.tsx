import { IoCopyOutline } from "react-icons/io5";

function InviteMerchant() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 ">
      <div className=" basis-2/3 flex-grow">
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

      <div className="basis 1/3 flex items-start justify-center">
        <button
          type="button"
          className="rounded-lg px-16 py-8 flex items-center justify-center max-w-[140px] text-[#2B2C34]"
        >
          Copy <IoCopyOutline className="text-foundation-darkPurple" />
        </button>
      </div>
    </div>
  );
}

export default InviteMerchant;
