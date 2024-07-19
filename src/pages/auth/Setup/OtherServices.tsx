import {BiSolidDownArrow} from "react-icons/bi";
import Modal from "../../../components/Modal/Modal";
import {useState} from "react";

const services = [{name: "Cafeteria", id: 1}, {name: "Electricity", id: 2}];

export default function OtherServices() {
    const [selectService, setSelectService] = useState<boolean>(false)
    const [chosenService, setChosenService] = useState<any>([])

    const chooseService = (service: any) => {
        console.log(service)
        const initialSelectedService = [...chosenService];
        const serviceIndex = initialSelectedService.findIndex((s: any) => s.name === service.name)
        if(serviceIndex === -1){
            initialSelectedService.push(service)
        }else{
            initialSelectedService[serviceIndex] = service;
        }
        setChosenService(initialSelectedService);

        setSelectService(!selectService);
        // setServiceChosen(service.name)
        // setChosenCountryCode(`+${country.phone_code}`);
    }

    const removeService = (serviceName: string) => {
        const initialSelectedService = [...chosenService];
        const filtered = initialSelectedService.filter((service) => service.name !== serviceName);
        setChosenService(filtered);
    }

    return (
        <>
            <div className="border border-[#E2DFDF] mt-4 p-3">
                <p className="font-satoshiMedium text-[16px] leading-6 tracking-tighter text-[#0E0C01]">Other
                    Services</p>
                <div className="flex flex-col mt-3">
                    <p className="font-satoshiMedium text-[14px] leading-5 tracking-tighter text-[#000000]">Select
                        Services</p>

                    <div onClick={() => setSelectService(!selectService)}>
                        <div
                            className="text-[14px] text-[#C8CCD0] font-satoshiRegular cursor-pointer rounded-md border border-[#C8CCD0] px-5 h-[48px] flex justify-between items-center">
                            <span>Select Services</span> <BiSolidDownArrow
                            color="#000000"/>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                        {chosenService.map((service: any) => <div
                            className="flex gap-2 p-2 bg-gray-200 items-center rounded">
                            <span className="text-[14px] font-satoshiMedium">{service?.name}</span>
                            <img src="/images/cancelx.svg" alt="Cancel" onClick={() => removeService(service.name)}
                                 className="cursor-pointer" width={24} height={24}/>
                        </div>)}
                    </div>
                </div>
            </div>

            <Modal open={selectService} onClick={() => setSelectService(!selectService)}>
                <div className="flex flex-col px-5 w-[400px]">
                    <h2 className="font-satoshiBold text-[20px] leading-7 text-[#000000] tracking-tighter">Select
                        Service</h2>
                    <div className="mt-3 gap-2 flex flex-col">
                        {services.map(service => <div className="flex items-center">
                            <div
                                className="h-[20px] w-[20px] bg-[#ffffff] border border-[#B4B8BB] mr-3 hover:border-[#4B0082]"></div>
                            <p onClick={() => chooseService(service)}
                               className="cursor-pointer hover:text-[#4B0082] hover:font-satoshi text-[#000000] font-satoshiRegular text-[16px] leading-6">{service.name}</p>
                        </div>)}
                    </div>
                </div>
            </Modal>
        </>
    );
}