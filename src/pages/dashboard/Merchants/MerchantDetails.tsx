import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button/Button2'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchWithParams from '../../../hooks/useFetchWithParams'
import { MerchantService } from '../../../services/merchant.service'
const MerchantDetails = () => {
    const navigate = useNavigate()

    const accountTabTitle = ['Overview', 'All Products', 'Product Sold']
    const [tabIndex, setTabIndex] = useState<number>(0)
    const displayAccountContent = (tabIndex: number) => {
        switch (tabIndex) {
            case 0:
                return <Overview />
            // return <BioProfile />
            case 1:
                return "2"
            case 2:
                return "3"
            default:
                return <Overview />
            // return <BioProfile />
        }
    }
    useEffect(() => {

    }, [tabIndex])

    return (
        <div className='px-4 pt-8 h-full'>
            <div className='flex items-center gap-6'>
                <button onClick={() => navigate(-1)} className='flex items-center -mt-6 text-primary gap-2'><img className='h-4 w-auto' src="/icons/arrow-left.svg" />Back</button>
                <BreadCrumbClient backText="All Merchants" currentPath="Account Details" brand='Jumia' />
            </div>

            <div className='my-6 flex items-center justify-between px-6' >

                <div className='flex items-center gap-3'>

                    <div className='relative'>
                        <img src='' className='w-8 h-8 bg-gray-500 border-primary border rounded-full' />

                        <span className='h-2 w-2 absolute rounded-full bottom-0  right-0 bg-green-500' />
                    </div>
                    <div>
                        <h3 className='text-xl font-bold'>FInna Store</h3>
                        <a href='https://marketsq.ng/Finnastore' className='text-xs text-[#6F7174]'>https://marketsq.ng/Finnastore</a>
                    </div>

                </div>

                <button className='px-3 py-2 font-semibold text-sm rounded bg-[#F03738]  text-white'>Suspend Merchant</button>

            </div>
            <div className="pt-4 pb-10 px-6 rounded-2xl mx-2">
                <div className="flex items-center mb-10 justify-between gap-10 border-b w-full">
                    <div className="flex items-center w-5/6 gap-2 flex-wrap">
                        {accountTabTitle.map((val, index) => (
                            <Button
                                key={index}
                                type="button"
                                className={`py-3 px-6 border-b-2 border-b-transparent !rounded-none hover:text-primary focus:text-primary active:text-primary transition-all
                    ${tabIndex === index && 'text-[#470E81] !border-b-[#470E81]'}
                    ${tabIndex !== index && 'text-[#6C6C73]'}
                  `}
                                onClick={() => setTabIndex(index)}
                            >
                                {val}
                            </Button>
                        ))}
                    </div>
                </div>
                {displayAccountContent(tabIndex)}
            </div>
        </div>
    )
}

const Overview = () => {

    const { id } = useParams()

    const { } = useFetchWithParams(
        ["query-merchant", {

            id,

        }, id],
        MerchantService.getMercharntDetails,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    return (
        <div className='w-full grid grid-cols-2 gap-3'>

            <div className='w-full px-6 py-6 rounded border h-[504px] bg-white'>

            </div>
            <div className='flex-col flex gap-3 w-full'>
                <div className='w-full bg-white border rounded p-6 h-[176px]'>

                </div>
                <div className='w-full bg-white border rounded p-6 h-[176px]'>

                </div>

            </div>

        </div>
    )
}

export default MerchantDetails