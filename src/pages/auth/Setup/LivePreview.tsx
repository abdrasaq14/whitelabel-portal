import {BiEnvelope, BiSolidDownArrow} from "react-icons/bi";
import {IoCall, IoHelpCircleOutline, IoSearchOutline} from "react-icons/io5";
import {MdFavoriteBorder} from "react-icons/md";
import {PiShoppingCartSimpleBold} from "react-icons/pi";
import {GrMenu, GrTwitter} from "react-icons/gr";
import Item from "./Item";
import {ImFacebook} from "react-icons/im";
import {TbBrandInstagram} from "react-icons/tb";

const inventory: any[] = [
    {name: "Ainvoer green hand bag", storeName: "MS Boutique", image: "/images/item1.svg", price: "16,500", rating: "/images/rating.svg"},
    {name: "Bar chair with Suede", storeName: "M&K Furniture store", image: "/images/item2.svg", price: "16,500", rating: "/images/rating.svg"},
    {name: "Club chair with Suede", storeName: "T-classic Furniture Store", image: "/images/item3.svg", price: "16,500", rating: "/images/rating.svg"},
    {name: "Ainvoer sunglasses & Purse", storeName: "MS Boutique", image: "/images/item4.svg", price: "16,500", rating: "/images/rating.svg"},
    {name: "Turtleneck Wool Carrigan", storeName: "High Tension boutique", image: "/images/item5.svg", price: "16,500", rating: "/images/rating.svg"},
    {name: "Ainvoer green hand bag", storeName: "MS boutique", image: "/images/item6.svg", price: "16,500", rating: "/images/rating.svg"},
    {name: "Turtleneck Wool Carrigan", storeName: "High Tension boutique", image: "/images/item7.svg", price: "16,500", rating: "/images/rating.svg"},
    {name: "Bar chair with Suede", storeName: "M&K Furniture store", image: "/images/item8.svg", price: "16,500", rating: "/images/rating.svg"}
]

export default function LivePreview() {
    return (
        <>
            <div className="bg-primary col-start-3 col-end-6 p-5">
                <p className="text-[#FFFFFF] text-[18px] tracking-tighter leading-6 font-satoshiBold">Live Preview</p>

                <div className="w-full mt-10">
                    <div className="flex p-2 w-full bg-[#380062] items-center">
                        <div className="flex items-center px-10">
                            <BiEnvelope color="#ffffff" size={14}/>
                            <span className="text-[#ffffff] text-[12px] mx-2">support@email.com</span>
                        </div>
                        <div className="flex items-center px-3">
                            <IoCall color="#ffffff" size={14}/>
                            <span className="text-[#ffffff] text-[12px] mx-2">+2348199999999</span>
                        </div>
                    </div>

                    <div className="bg-[#ffffff] px-10 py-3">
                        <div className="grid grid-cols-7">
                            <div className="col-start-1 col-end-3"><img src="/client-asset/landmark_logo.png"
                                                                        style={{maxWidth: 100}}/></div>
                            <div className="col-start-3 col-end-5 flex justify-center items-center">
                                <div
                                    className="border border-[#006600] w-full h-[35px] flex justify-between items-center pl-2 rounded-md">
                                    <span
                                        className="font-satoshi text-[14px] text-[#6F7174] leading-5 tracking-tighter">Search</span>
                                    <div
                                        className="h-[35px] w-[35px] items-center justify-center flex bg-[#006600] rounded-r-md">
                                        <IoSearchOutline size={20} color="#ffffff"/></div>
                                </div>
                            </div>
                            <div className="col-start-5 col-end-8 flex justify-between items-center pl-16">
                                <PiShoppingCartSimpleBold size={18} color="#006600" className="font-extrabold"/>
                                <MdFavoriteBorder size={18} color="#006600"/>
                                <div className="flex items-center"><IoHelpCircleOutline size={18} color="#006600"/>
                                    <span className="text-[#006600] text-[12px] font-satoshi">Help</span></div>
                                <div className="flex items-center">
                                    <div
                                        className="w-[30px] h-[30px] bg-[#006600] rounded-full flex justify-center items-center">
                                        <img src="/icons/user_icon.svg" className="w-[80%] h-[80%]"/></div>
                                    <span className="ml-1 text-[#006600] text-[12px] font-satoshi">Jane Bella</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center mt-2">
                            <div className="flex items-center">
                                <GrMenu color="#006600" size={18}/>
                                <span className="text-[#006600] font-satoshiMedium mx-2">All</span>
                                <BiSolidDownArrow color="#006600" size={18}/>
                            </div>
                            <span className="text-[#006600] font-satoshiRegular mx-7">Electricity</span>
                            <span className="text-[#006600] font-satoshiRegular mx-2">Cafeteria</span>
                        </div>
                    </div>

                    <div className="w-full h-[220px] bg-[#E6F0E6] grid grid-cols-2">
                        <div className="h-[220px] flex flex-col justify-center items-end">
                            <div className="w-[100%] flex justify-end">
                                <p className="text-[18px] font-satoshi w-[80%]">One - Stop Online Shopping on LandMart
                                    for all your Basic Needs</p>
                            </div>
                            <div className="w-[80%] flex">
                                <button onClick={() => {
                                }}
                                        className='mt-1 bg-[#006600] text-white text-center px-7 py-1 rounded font-satoshiMedium inline-flex items-center justify-center'>Explore
                                </button>
                            </div>
                        </div>
                        <div className="h-[220px] flex flex-col justify-center items-center"><img
                            src="/banner_img.svg"/></div>
                    </div>

                    <div className="w-full bg-[#ffffff] px-10 py-5">
                        <h2 className="font-satoshi text-[14px] text-[#2B2C34] leading-2 tracking-tighter">Explore
                            Categories</h2>
                        <div className="flex items-center mt-3 justify-between items-center">
                            <div className="flex flex-col items-center">
                                <p className="h-[53px] w-[53px] bg-[#006600] rounded-full flex justify-center items-center text-[#ffffff] font-satoshi text-[12px]">All</p>
                                <p className="text-[#000000] text-[10px]">All</p>
                            </div>
                            <img src="/images/cat1.svg"/>
                            <img src="/images/cat2.svg"/>
                            <img src="/images/cat3.svg"/>
                            <img src="/images/cat4.svg"/>
                            <img src="/images/cat5.svg"/>
                            <img src="/images/cat6.svg"/>
                            <img src="/images/cat7.svg"/>
                        </div>
                    </div>

                    <div className="w-full bg-[#ffffff] px-10 py-5">
                        <h2 className="font-satoshi text-[14px] text-[#2B2C34] leading-2 tracking-tighter">Dummy Data</h2>
                        <div className="grid grid-cols-4 gap-4 mt-5">
                            {inventory.map((item) => <Item itemData={item}/>)}
                        </div>
                    </div>

                    <div className="bg-[#ffffff] pt-10 px-10">
                        <p className="text-center text-[#006600] text-[18px] font-satoshi">About Us</p>
                        <p className="text-[12px] text-center mt-5">Welcome to Landmark University's Marketplace, where innovation meets seamless commerce. Our platform, Marketsq, is a revolutionary two-in-one solution that blends the features of an e-commerce marketplace with a freelancing platform.
                            This unique combination allows buyers to access sellers' storefronts to buy and sell goods and services, fostering a seamless experience for transactions and freelance collaborations.</p>
                        <div className="mt-10 grid grid-cols-4 gap-5 border">
                            <div className="flex items-center justify-around p-2 border border-[#006600] rounded-md">
                                <img src="/images/lock.svg"/>
                                <span className="font-satoshiRegular text-[#006600] text-[12px]">Secure Payment</span>
                            </div>
                            <div className="flex items-center justify-around p-2 border border-[#006600] rounded-md">
                                <img src="/images/truck-fast.svg"/>
                                <span className="font-satoshiRegular text-[#006600] text-[12px]">Fast Delivery</span>
                            </div>
                            <div className="flex items-center justify-around p-2 border border-[#006600] rounded-md">
                                <img src="/images/tick-circle.svg"/>
                                <span className="font-satoshiRegular text-[#006600] text-[12px]">100% Guarantee</span>
                            </div>
                            <div className="flex items-center justify-around p-2 border border-[#006600] rounded-md">
                                <img src="/images/hand.svg"/>
                                <span className="font-satoshiRegular text-[#006600] text-[12px]">Reliable Service</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#ffffff] pt-5">
                        <p className="bg-[#006600] h-[40px] w-full font-satoshiMedium text-[12px] flex justify-center items-center text-[#ffffff] mt-10">Back to top</p>
                    </div>

                    <div className="bg-[#000000] p-10 grid grid-cols-2">
                        <div className="flex flex-col">
                            <img src="/client-asset/landmark_logo.png" style={{maxWidth: 100}}/>
                            <p className="font-satoshiMedium mt-5 text-[14px] text-[#ffffff] leading-2 tracking-tight">New to Landmark</p>
                            <p className="font-satoshiRegular text-[12px] text-[#ffffff] leading-2 tracking-tight">Subscribe to our newsletter to get updates on our new offers</p>
                            <div className="flex mt-3">
                                <div className="w-[70%] bg-[#ffffff] h-[30px] rounded-l-md text-[12px] px-5 flex items-center font-satoshiMedium">Enter your email address</div>
                                <div className="w-[30%] bg-[#006600] h-[30px] rounded-r-md text-[12px] text-[white] font-satoshiRegular flex justify-center items-center">Subscribe</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-[#ffffff] font-satoshiMedium text-[14px]">Company</p>
                            <p className="text-[#ffffff] font-satoshiRegular text-[12px]">About Us</p>
                            <p className="text-[#ffffff] font-satoshiRegular text-[12px]">Terms and Conditions</p>
                            <p className="text-[#ffffff] font-satoshiRegular text-[12px]">Register/Login</p>

                            <p className="text-[#ffffff] font-satoshiMedium text-[14px] mt-5">Help Center</p>
                            <p className="text-[#ffffff] font-satoshiRegular text-[12px]">Contact Us</p>
                            <p className="text-[#ffffff] font-satoshiRegular text-[12px]">F.A.Q</p>
                            <p className="text-[#ffffff] font-satoshiRegular text-[12px]">Help Center</p>

                            <div className="flex mt-5 gap-3 items-center">
                                <span className="text-[#ffffff] font-satoshiRegular text-[12px]">JOIN US ON</span>
                                <ImFacebook color={"#ffffff"} size={12} />
                                <TbBrandInstagram color={"#ffffff"} size={12} />
                                <GrTwitter color={"#ffffff"} size={12} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
