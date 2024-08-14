import Modal from "../../../components/Modal/Modal";
import {useEffect, useState} from "react";

const socials: string[] = ["facebook", "twitter", "instagram", "linkedin", "tiktok"];

export default function AddSocials({data, setSocial}: any) {
    const [selectSocial, setSelectSocial] = useState<boolean>(false)
    const [chosenSocials, setChosenSocials] = useState<string[]>(["linkedin"])

    useEffect(() => {
        console.log("Social data", data)
        const result = objectPropertiesToArray(data);
        setChosenSocials(result);
    }, [])

    const objectPropertiesToArray = (obj: any) => {
        return Object.entries(obj)
            .filter(([key, value]) => value !== "")
            .map(([key]) => key);
    }

    const chooseSocial = (social: string) => {
        const initialSelectedSocials = [...chosenSocials];
        const socialIndex = initialSelectedSocials.findIndex((s: any) => s === social)
        if(socialIndex === -1){
            initialSelectedSocials.push(social)
        }else{
            initialSelectedSocials[socialIndex] = social;
        }
        setChosenSocials(initialSelectedSocials);
        setSelectSocial(!selectSocial);
    }

    const setSocialData = (key: string, value: string) => {
        console.log(key, value)
        let obj: any = {};
        obj[key] = value
        setSocial(obj)
    }

    return (
        <>
            <div className="border border-[#E2DFDF] mt-4 p-3">
                <div className="flex justify-between items-center">
                    <p className="font-satoshiMedium text-[16px] leading-6 tracking-tighter text-[#0E0C01]">Social Media
                        Account Link</p>
                    <img src="/icons/add_socials.svg" className="cursor-pointer" onClick={() => setSelectSocial(!selectSocial)} alt="add_socials_icon" />
                </div>
                {chosenSocials.map((social, index: number) => <div key={index} className="flex flex-col gap-2 mt-3 w-full">
                    <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">{social.charAt(0).toUpperCase() + social.slice(1)}
                        &nbsp;Link</p>
                    <input
                        type='text'
                        name={social}
                        value={data[social]}
                        onChange={(e) => setSocialData(social, e.currentTarget.value)}
                        placeholder={data[social]}
                        className="w-full outline-none border border-[#D0D5DD] rounded-md h-[40px] px-[14px]"
                    />
                </div>)}
            </div>

            <Modal open={selectSocial} onClick={() => setSelectSocial(!selectSocial)}>
                <div className="flex flex-col px-5 w-[400px]">
                    <h2 className="font-satoshiBold text-[20px] leading-7 text-[#000000] tracking-tighter">Add Social Link</h2>
                    <div className="mt-3 gap-2 flex flex-col">
                        {socials.map((social, index: number) => <div key={index} className="flex items-center">
                            {/*<div*/}
                            {/*    className="h-[20px] w-[20px] bg-[#ffffff] border border-[#B4B8BB] mr-3 hover:border-[#4B0082]"></div>*/}
                            <p onClick={() => chooseSocial(social)}
                               className="cursor-pointer hover:text-[#4B0082] hover:font-satoshi text-[#000000] font-satoshiRegular text-[16px] leading-6">{social}</p>
                        </div>)}
                    </div>
                </div>
            </Modal>
        </>
    );
}