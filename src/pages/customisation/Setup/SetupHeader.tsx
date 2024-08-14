import {MdOutlineKeyboardBackspace} from "react-icons/md";
import React from "react";

export default function SetupHeader({stage, prev}: any) {
    const arrayOf3: number[] = Array.from({length: 3}, (_, i) => i);
    return (
        <div className="flex flex-col mt-10">
            <div
                className="flex gap-1 items-center cursor-pointer mb-6"
                onClick={prev}
            >
                <MdOutlineKeyboardBackspace size={22}/>
                <span className="font-satoshiMedium">Back</span>
            </div>
            <h4 className="text-[#2B2C34] font-satoshiBold text-[36px] leading-10 tracking-tighter">Customise your
                Account</h4>
            {stage === 0 &&
                <h6 className="mt-3 text-[#2B2C34] font-satoshiMedium text-[24px] leading-8 tracking-tighter">Let's get
                    started!</h6>}
                <h6 className="mt-2 text-[#5A5A5A] font-satoshiRegular text-[14px] leading-5 tracking-tighter">
                    {stage === 0 ? "Provide your choice color code and other Information below" : "Provide the relevant information below"}</h6>
            <div className="flex gap-3 items-center mt-3">
                {arrayOf3.map((num) => <div key={num}
                                            className={`h-[6px] rounded ${num === stage ? "bg-primary w-[63px]" : "bg-[#4B00821F] w-[12px]"}`}></div>)}
            </div>
        </div>
    );
}