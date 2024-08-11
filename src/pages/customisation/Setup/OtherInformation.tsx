import {MdMailOutline} from "react-icons/md";
import TextInput from "../../../components/FormInputs/TextInput2";

export default function OtherInformation({setInfo, contact}: any) {
    return (
        <>
            <div className="border border-[#E2DFDF] mt-4 p-3">
                <p className="font-satoshiMedium text-[16px] leading-6 tracking-tighter text-[#0E0C01]">Other
                    Information</p>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2 mt-3 w-full">
                        <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">Customer
                            Email (Customer Support)</p>
                        <input
                            name='email'
                            type='email'
                            value={contact.email.supportEmail}
                            onChange={(e) => setInfo({supportEmail: e.target.value})}
                            placeholder='support@email.com'
                            className="outline-none border border-[#D0D5DD] rounded-md h-[40px] px-[14px]"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-3 w-full">
                        <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">Contact
                            Phone Number</p>
                        <input
                            name='phone'
                            type='phone'
                            value={contact.phone}
                            onChange={(e) => setInfo({phone: e.target.value})}
                            placeholder='+1(555)000-0000'
                            className="outline-none border border-[#D0D5DD] rounded-md h-[40px] px-[14px]"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-3 w-full col-span-2">
                        <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">No-Reply Email</p>
                        <input
                            name='noreply_email'
                            type='email'
                            value={contact.email.senderEmail}
                            onChange={(e) => setInfo({senderEmail: e.target.value})}
                            placeholder='no-reply@email.com'
                            className="outline-none border border-[#D0D5DD] rounded-md h-[40px] px-[14px]"
                        />
                        <small className="text-[#4D5154] leading-4 font-satoshiMedium text-[12px] tracking-tighter">This email would be used to send notifications to users on your platform</small>
                    </div>
                </div>
            </div>
        </>
    );
}