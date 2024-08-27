import { useState, useEffect, useRef } from "react";
const errorMessages = {aboutUs: {error: false, message: "About us is required"}, aboutUsFull: {error: false, message: "About us is required"}}

export default function AboutUs({data, setAboutData, setFormError,}: any) {
    const [error, setError] = useState(errorMessages)
    const [aboutUs, setAboutUs] = useState(null);
    const [aboutUsFull, setAboutUsFull] = useState(null);

    const inputAboutUs: any = useRef(null);
    const inputAboutUsFull: any = useRef(null);

    useEffect(() => {
        console.log("Calling useEffect")
        if(aboutUs === null){
            console.log("Entering if")
            const inputValue = inputAboutUs.current.value;
            console.log("Input about us", inputValue)
            setAboutUs(inputValue);
            setAboutData({shortText: inputValue})
            setError({...error, aboutUs: {error: inputValue === "" || !(inputValue.length > 50 && inputValue.length <= 300) ? true : false, message: "About us is required"}})  
            console.log("Inner error", inputValue === "" || !(inputValue.length > 50 && inputValue.length <= 300))
            setFormError({aboutUs: inputValue === "" || !(inputValue.length > 50 && inputValue.length <= 300)})
        }

        if(aboutUsFull === null){
            console.log("Entering if")
            const inputValue = inputAboutUsFull.current.value;
            console.log("Input sabout us full", inputValue)
            setAboutUsFull(inputValue);
            setAboutData({longText: inputValue})
            setError({...error, aboutUsFull: {error: inputValue === "" || !(inputValue.length > 200 && inputValue.length <= 2000) ? true : false, message: "About us is required"}})  
            console.log("Inner error", inputValue === "" || !(inputValue.length > 200 && inputValue.length <= 2000))
            setFormError({aboutUsFull: inputValue === "" || !(inputValue.length > 200 && inputValue.length <= 2000)})
        }
    }, []);

    const handleSetAboutData = (e: any) => {
        const value = e.target.value;
        setAboutUs(value);
        setAboutData({shortText: value})
        setError({...error, aboutUs: {error: value === "" || !(value.length > 50 && value.length <= 300) ? true : false, message: "About us is required"}})
        setFormError({aboutUs: value === "" || !(value.length > 50 && value.length <= 300)})
    }

    const handleSetFullAboutData = (e: any) => {
        const value= e.target.value;
        setAboutUsFull(value);
        setAboutData({longText: e.target.value})
        setError({...error, aboutUsFull: {error: value === "" || !(value.length > 200 && value.length <= 2000) ? true : false, message: "About us is required"}})  
        setFormError({aboutUsFull: value === "" || !(value.length > 200 && value.length <= 2000)})
    }

    return (
        <>
            <div className="border border-[#E2DFDF] mt-4 p-3">
                <p className="font-satoshiMedium text-[16px] leading-6 tracking-tighter text-[#0E0C01]">About Us Information</p>
                <div className="flex flex-col gap-2 mt-3 w-full">
                    <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">About Us
                        Summary</p>
                    <textarea
                        value={data.shortText}
                        ref={inputAboutUs}
                        onChange={(e) => handleSetAboutData(e)}
                        rows={5}
                        maxLength={300}
                        placeholder='Provide your about us summary text here...'
                        className="outline-none border border-[#D0D5DD] rounded-md px-[14px]">
                    </textarea>
                    <div className="flex justify-between items-center">
                        {error.aboutUs.error && <small className="text-[#cc0000] leading-4 font-satoshiMedium text-[12px]">{error.aboutUs.message}</small>}
                        <small className="text-[#4D5154] leading-4 font-satoshi text-[12px] text-end tracking-tighter">Max of 300 characters</small>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-5 w-full col-span-2">
                    <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">About Us (in-full details)</p>
                        <textarea
                            value={data.longText}
                            ref={inputAboutUsFull}
                            onChange={(e) => handleSetFullAboutData(e)}
                            maxLength={2000}
                            rows={5}
                            placeholder='Provide your about us information here...'
                            className="outline-none border border-[#D0D5DD] rounded-md px-[14px]"
                        />
                        {error.aboutUsFull.error && <small className="text-[#cc0000] leading-4 font-satoshiMedium text-[12px]">{error.aboutUsFull.message}</small>}
                        <div className="flex items-center justify-between">
                            <small className="text-[#4D5154] leading-4 font-satoshiMedium text-[10px]">The
                                information provided here would be on the About Us page</small>
                            <small className="text-[#4D5154] text-end leading-4 font-satoshi text-[12px] tracking-tighter">Max of 2000 characters</small>
                        </div>
                    </div>
            </div>
        </>
    );
}