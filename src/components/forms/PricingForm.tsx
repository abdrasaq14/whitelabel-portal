import { useCustomFormik } from '@/customHooks/useCustomFormik'
import useStorage from '@/customHooks/useStorage'
import { PricingValidation } from '@/utilities/validations'
import React from 'react'
import AppTextBox from './AppTextBox'
import { ButtonType, SpinnerType, TextboxType } from '@/enums/ComponentEnums'
import useSettings from '@/customHooks/useSettings'
import AppButton from './AppButton'

const PricingForm = () => {
    const { currentUser } = useStorage()
    const { loading, handleChangeInfo } = useSettings()

    const  initialValues =  {
        commisionPercentage: currentUser?.user?.commisionPercentage
    }
    console.log("Initial values", currentUser)

    const onSubmit = (values: any) => {
        handleChangeInfo(values)
    };

    const { handleBlur, handleChange, errors, values, handleSubmit, touched } = useCustomFormik(initialValues, onSubmit, PricingValidation)

    return (
        <div>
            <h1 className="text-lg text-black font-bold font-satoshiBold mb-3 flex items-center gap-2">
                product Pricing
            </h1>

            <h3 className="text-sm mb-3 text-[#6F7174]">Provide a default percentage that should be added to each product price</h3>

            <form onSubmit={handleSubmit}>
                <AppTextBox type={TextboxType.TEXT} onBlur={handleBlur} onChange={handleChange} value={values.commisionPercentage}  name='commisionPercentage' topLabel="Enter Percentage" placeholder="5%" />
                <div className='w-full mt-4'>
                    <AppButton loader={{loading, type: SpinnerType.SECONDARY, height: 25, width: 25}} type={ButtonType.PRIMARY} text='Proceed' handleClick={() => {}} />
                </div>
            </form>
        </div>
    )
}

export default PricingForm