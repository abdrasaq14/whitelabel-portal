import { BsCurrencyDollar } from "react-icons/bs";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { ErrorMessage, Form, Formik, FormikHelpers, FormikProvider, FormikValues, useFormik } from "formik";
import { IoLanguage } from "react-icons/io5";
import { Button } from "../../../components/Button/Button";
import TextInput from "../../../components/FormInputs/TextInput2";



const Currency = () => {
    const form = useFormik({
        initialValues: {

        },
        onSubmit: (values: any) => {

        }
    })
    return (
        <div>
            <h1 className="text-lg text-black font-bold font-satoshiBold mb-3 flex items-center gap-2">
                Currency
                <span className="font-regular font-satoshiBold text-sm text-gray-400">
                    Choose a default Currency
                </span>
            </h1>

            <FormikProvider value={form}>
                <form onSubmit={form.handleSubmit}>
                    <TextInput label="Select a default Currency" placeholder="currency" name='select'>
                        <option>Currency</option>
                        <option value="USD">USD</option>
                        <option value="NGN">NGN</option>
                        <option value="EUR">EUR</option>
                    </TextInput>
                </form>
            </FormikProvider>


        </div>
    )
}



const Language = () => {
    const form = useFormik({
        initialValues: {

        },
        onSubmit: (values: any) => {

        }
    })
    return (
        <>
            <h1 className="text-lg text-black font-bold font-satoshiBold mb-3 flex items-center gap-2">
                Language
                <span className="font-regular font-satoshiBold text-sm text-gray-400">
                    Choose a default Language
                </span>
            </h1>

            <FormikProvider value={form}>
                <form onSubmit={form.handleSubmit}>
                    <TextInput label="Select a default Language" placeholder="Language" name='select'>
                        <option>Language</option>
                        <option value="USD">ENG</option>
                        <option value="NGN">FRN</option>
                        <option value="EUR">ESP</option>
                    </TextInput>
                </form>
            </FormikProvider>

        </>
    );
};


const Pricing = () => {
    const form = useFormik({
        initialValues: {

        },
        onSubmit: (values: any) => {

        }
    })

    return (
        <div>
             <h1 className="text-lg text-black font-bold font-satoshiBold mb-3 flex items-center gap-2">
                product Pricing
            </h1>

            <h3 className="text-sm mb-3 text-[#6F7174]">Provide a default percentage that should be added to each product price</h3>

            <FormikProvider value={form}>
                <form onSubmit={form.handleSubmit}>
                    <TextInput label="Enter Percentage" placeholder="5%" name="percentage" />
                    <Button className="w-full font-semibold mt-4" label="Update"/>
                </form>
            </FormikProvider>
        </div>
    )
}



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
                return <Language />;
            case 1:
                return <Currency />;
            case 2:
                return <Pricing />;
            default:
                return <Language />;
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
                        className={`text-xs lg:text-sm px-4 py-3 lg:px-3 lg:py-4 justify-center lg:w-full rounded-xl flex items-center gap-2 transition-all
                ${selectedSecurityTab === index && "bg-[#EDE6F3] border border-primary"
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
