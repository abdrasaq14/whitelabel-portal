"use client";

import React, { useState } from 'react'
import { IoLanguage } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import LanguageForm from '../forms/LanguageForm';
import CurrencyForm from '../forms/CurrencyForm';
import PricingForm from '../forms/PricingForm';


const OtherSettings = () => {
    const securityTabList = [
        {
            Icon: IoLanguage,
            name: "Language",
        },
        {
            Icon: BsCurrencyDollar,
            name: "Currency",
        },
        {
            Icon: BsCurrencyDollar,
            name: "Product Pricing",
        },
    ];
    const [selectedSecurityTab, setSelectedSecurityTab] = useState<number>(0);
    const displaySecurityContent = (selectedSecurityTab: number) => {
        switch (selectedSecurityTab) {
            case 0:
                return <LanguageForm />;
            case 1:
                return <CurrencyForm />;
            case 2:
                return <PricingForm />;
            default:
                return <LanguageForm />;
        }
    };

    return (
        <div className="flex w-full flex-wrap h-full items-stretch gap-5 lg:gap-10">
            <p className="text-base text-[#919191] font-bold lg:hidden">
                Security Panel
            </p>
            <div className="w-full lg:w-[33%] xl:w-2/5  rounded-lg p-0 lg:p-4 items-center lg:h-[400px] xl:max-w-[200px] flex flex-row lg:flex-col gap-2">
                {securityTabList.map(({ Icon, name }, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`text-xs lg:text-sm px-4 py-3 lg:px-3 lg:py-4  justify-center lg:w-full rounded-xl flex items-center gap-2 transition-all
                            ${selectedSecurityTab === index ? "bg-[#EDE6F3] border border-purple-main text-purple-main" : " text-[#1e1c1c]"
                            } outline-none
                          `}
                        onClick={() => setSelectedSecurityTab(index)}
                    >
                        <Icon className="lg:text-xl text-base" />
                        {name}
                    </button>
                ))}
            </div>
            <div className="w-full lg:w-[70%] xl:w-3/4  h-full max-w-[394px]">
                {displaySecurityContent(selectedSecurityTab)}
            </div>
        </div>
    );
};

export default OtherSettings;