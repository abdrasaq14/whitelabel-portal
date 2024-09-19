import {useState, useEffect, useRef} from "react";
import {MdMailOutline} from "react-icons/md";
import TextInput from "../../../components/FormInputs/TextInput2";
import { BiSolidDownArrow } from "react-icons/bi";
import Modal from "../../../components/Modal/Modal";
import { countries } from "../../../utils/countries";

const errorMessages = {email: {error: false, message: "Add a valid support email"}, phone: {error: false, message: "Add a valid mobile (Ex: +1488384)"}, noreply_email: {error: false, message: "Add a valid no-reply email"}}

export default function OtherInformation({setInfo, setFormError, contact}: any) {
    const [error, setError] = useState(errorMessages)
    const [contactEmail, setContactEmail] = useState(null);
    const [senderEmail, setSenderEmail] = useState(null);
    const [contactPhone, setContactPhone] = useState("");
    const [openCountryCodes, setOpenCountryCodes] = useState(false);
    const [chosenCountryCode, setChosenCountryCode] = useState<string>(`${countries[0].phone_code}`);

    const inputContactEmail: any = useRef(null);
    const inputSenderEmail: any = useRef(null);
    const inputContactPhone: any = useRef(null);


    useEffect(() => {
        console.log("Calling useEffect")
        if(contactEmail === null){
            console.log("Entering if")
            const inputValue = inputContactEmail.current.value;
            console.log("Input contact email", inputValue)
            setContactEmail(inputValue);
            setInfo({supportEmail: inputValue})
            setError({...error, email: {error: inputValue === "" || !validateEmail(inputValue) ? true : false, message: "Add a valid support email"}})  
            console.log("Inner error", inputValue === "" || !validateEmail(inputValue))
            setFormError({contactEmail: inputValue === "" || !validateEmail(inputValue)})
        }

        if(senderEmail === null){
            console.log("Entering if")
            const inputValue = inputSenderEmail.current.value;
            console.log("Input sender email", inputValue)
            setSenderEmail(inputValue);
            setInfo({senderEmail: inputValue})
            setError({...error, noreply_email: {error: inputValue === "" || !validateEmail(inputValue) ? true : false, message: "Add a valid no-reply email"}})  
            console.log("Inner error", inputValue === "" || !validateEmail(inputValue))
            setFormError({senderEmail: inputValue === "" || !validateEmail(inputValue)})
        }

        if(contactPhone === null){
            console.log("Entering if")
            const inputValue = inputContactPhone.current.value;
            console.log("Input contact phone", inputValue)
            setContactPhone(inputValue);
            setInfo({phone: inputValue})
            setError({...error, phone: {error: inputValue === "" || !validatePhone(inputValue) ? true : false, message: "Add a valid mobile (Ex: +1488384)"}})  
            console.log("Inner error", inputValue === "" || !validateEmail(inputValue))
            setFormError({contactPhone: inputValue === "" || !validatePhone(inputValue)})
        }
    }, []);

    const handleSetContactEmail = (e: any) => {
        const value = e.target.value;
        setContactEmail(value);
        setInfo({supportEmail: value})
        setError({...error, email: {error: value === "" || !validateEmail(value) ? true : false, message: "Add a valid support email"}})  
        setFormError({contactEmail: value === "" || !validateEmail(value)})
    }

    const handleSetSenderEmail = (e: any) => {
        const value = e.target.value;
        setSenderEmail(value);
        setInfo({senderEmail: value})
        setError({...error, noreply_email: {error: value === "" || !validateEmail(value) ? true : false, message: "Add a valid no-reply email"}})
        setFormError({senderEmail: value === "" || !validateEmail(value)})
    }

    const handleSetContactPhone = (e: any) => {
        const value = e.target.value;
        setContactPhone(value);
        setInfo({phone: value})
        setError({...error, phone: {error: value === "" || !validatePhone(value) ? true : false, message: "Add a valid mobile (Ex: +1488384)"}})
        setFormError({contactPhone: value === "" || !validatePhone(value)})
    }

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const validatePhone = (phone: string) => {
        const pattern = /^\d+$/;
        return phone.length >= 5 && pattern.test(phone);
    }

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
                            ref={inputContactEmail}
                            value={contact.email.supportEmail}
                            onChange={(e) => handleSetContactEmail(e)}
                            placeholder='support@email.com'
                            className="outline-none border border-[#D0D5DD] rounded-md h-[40px] px-[14px]"
                        />
                        {error.email.error && <small className="text-[#cc0000] leading-4 font-satoshiMedium text-[12px]">{error.email.message}</small>}
                    </div>

                    <div className="flex flex-col gap-2 mt-3 w-full">
                        <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">Contact
                        Phone Number</p>
                        <div className="flex items-center w-full">
                            <div
                                className="h-[40px] bg-primary px-2 rounded-l-md flex justify-center items-center cursor-pointer" onClick={() => setOpenCountryCodes(true)}>
                                <span className="text-[#ffffff] text-[16px] leading-6">+{contact.phone.cCode || chosenCountryCode}</span>
                                <BiSolidDownArrow color="#ffffff" className="ml-1"/>
                            </div>
                            <input
                                name='phone'
                                type='phone'
                                ref={inputContactPhone}
                                value={contact.phone.val}
                                onChange={(e) => handleSetContactPhone(e)}
                                placeholder=""
                                className="outline-none border border-[#D0D5DD] rounded-r-md h-[40px] px-[14px] w-full"
                            />
                        </div>
                        {error.phone.error && <small className="text-[#cc0000] leading-4 font-satoshiMedium text-[12px]">{error.phone.message}</small>}
                    </div>

                    <div className="flex flex-col gap-2 mt-3 w-full col-span-2">
                        <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">No-Reply Email</p>
                        <input
                            name='noreply_email'
                            type='email'
                            ref={inputSenderEmail}
                            value={contact.email.senderEmail}
                            onChange={(e) => handleSetSenderEmail(e)}
                            placeholder='no-reply@email.com'
                            className="outline-none border border-[#D0D5DD] rounded-md h-[40px] px-[14px]"
                        />
                        {error.noreply_email.error && <small className="text-[#cc0000] leading-4 font-satoshiMedium text-[12px]">{error.noreply_email.message}</small>}
                        <small className="text-[#4D5154] leading-4 font-satoshiMedium text-[12px] tracking-tighter">This email would be used to send notifications to users on your platform</small>
                    </div>
                </div>
            </div>

            <Modal open={openCountryCodes} onClick={() => setOpenCountryCodes(!openCountryCodes)}>
                <div className="flex flex-col px-5 w-[400px]">
                    <h2 className="font-satoshiBold text-[20px] leading-7 text-[#000000] tracking-tighter">Select
                        Service</h2>
                    <div className="mt-3 gap-2 flex flex-col h-[500px] overflow-auto">
                        {countries.map((country: any, index: number) => <div key={index} className="flex items-center">
                            <p onClick={() => {setChosenCountryCode(country.phone_code); setOpenCountryCodes(!openCountryCodes)}}
                               className="cursor-pointer hover:text-[#4B0082] hover:font-satoshi text-[#000000] font-satoshiRegular text-[16px] leading-6">{country.name} (+{country.phone_code})</p>
                        </div>)}
                    </div>
                </div>
            </Modal>
        </>
    );
}