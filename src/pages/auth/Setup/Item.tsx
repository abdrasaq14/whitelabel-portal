
export default function Item({itemData}: any) {
    return (
        <>
            <div className="border border-[#C8CCD0] p-2 flex flex-col rounded-md">
                <div className="w-full flex flex-col">
                    <span className="text-[#2B2C34] text-[10px] font-satoshi leading-2 tracking-normal">{itemData.name}</span>
                    <span className="text-[#2B2C34] text-[8px] font-satoshiRegular leading-2 tracking-normal">{itemData.storeName}</span>
                </div>
                <div className="w-full">
                    <img src={itemData.image} alt="item-image" className="w-full" />
                </div>
                <p className="w-full text-end font-satoshiRegular text-[10px]">&#8358;{itemData.price}</p>
                <div className="flex justify-between items-center mt-2">
                    <button onClick={() => {}} className='bg-[#006600] text-white text-center px-1 py-1 rounded font-satoshiMedium inline-flex items-center justify-center text-[10px]'>Add to Cart
                    </button>
                    <img src={itemData.rating} />
                </div>
            </div>
        </>
    );
}
