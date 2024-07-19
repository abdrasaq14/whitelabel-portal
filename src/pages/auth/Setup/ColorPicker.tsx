// import {useState} from "react";

export default function ColorPicker() {
    return (
        <>
            <div className="border border-[#E2DFDF] mt-7 p-3">
                <p className="font-satoshiMedium text-[16px] leading-6 tracking-tighter text-[#0E0C01]">Color
                    Customization</p>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col mt-3">
                        <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">Primary
                            Color</p>
                        <div className="bg-[#F1F0F0] p-2 mt-2 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="h-[20px] w-[20px] bg-[#ffffff] border border-[#4B0082] mr-3"></div>
                                <span
                                    className="text-[#000000] font-satoshiMedium leading-5 tracking-tighter text-[14px]">FFFFFF</span>
                            </div>
                            <span
                                className="text-[#000000] font-satoshiRegular leading-4 tracking-tighter text-[12px]">100%</span>
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">Secondary
                            Color <span
                                className="text-[#000000] font-satoshiRegular leading-4 tracking-tighter text-[12px]">(Lighter shade)</span>
                        </p>
                        <div className="bg-[#F1F0F0] p-2 mt-2 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="h-[20px] w-[20px] bg-[#ffffff] border border-[#4B0082] mr-3"></div>
                                <span
                                    className="text-[#000000] font-satoshiMedium leading-5 tracking-tighter text-[14px]">FFFFFF</span>
                            </div>
                            <span
                                className="text-[#000000] font-satoshiRegular leading-4 tracking-tighter text-[12px]">100%</span>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">Footer
                            Color</p>
                        <div className="bg-[#F1F0F0] p-2 mt-2 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="h-[20px] w-[20px] bg-[#ffffff] border border-[#4B0082] mr-3"></div>
                                <span
                                    className="text-[#000000] font-satoshiMedium leading-5 tracking-tighter text-[14px]">FFFFFF</span>
                            </div>
                            <span
                                className="text-[#000000] font-satoshiRegular leading-4 tracking-tighter text-[12px]">100%</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}