

export default function AboutUs({data, setAboutData}: any) {
    return (
        <>
            <div className="border border-[#E2DFDF] mt-4 p-3">
                <p className="font-satoshiMedium text-[16px] leading-6 tracking-tighter text-[#0E0C01]">About Us Information</p>
                <div className="flex flex-col gap-2 mt-3 w-full">
                    <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">About Us
                        Summary</p>
                    <textarea
                        value={data.shortText}
                        onChange={(e) => setAboutData({shortText: e.target.value})}
                        rows={5}
                        maxLength={500}
                        placeholder='Provide your about us summary text here...'
                        className="outline-none border border-[#D0D5DD] rounded-md px-[14px]"></textarea>
                    <small className="text-[#4D5154] leading-4 font-satoshi text-[12px] text-end tracking-tighter">Max of 300 characters</small>
                </div>

                <div className="flex flex-col gap-2 mt-5 w-full col-span-2">
                    <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">About Us (in-full details)</p>
                        <textarea
                            value={data.longText}
                            onChange={(e) => setAboutData({longText: e.target.value})}
                            maxLength={2000}
                            rows={5}
                            placeholder='Provide your about us information here...'
                            className="outline-none border border-[#D0D5DD] rounded-md px-[14px]"
                        />
                        <div className="flex items-center justify-between">
                            <small className="text-[#4D5154] leading-4 font-satoshiMedium text-[12px] tracking-tighter">The
                                information provided here would be on the About Us page</small>
                            <small className="text-[#4D5154] text-end leading-4 font-satoshi text-[12px] tracking-tighter">Max of 2000 characters</small>
                        </div>
                    </div>
            </div>
        </>
    );
}