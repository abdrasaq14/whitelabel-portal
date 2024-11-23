import { useCustomFormik } from '@/customHooks/useCustomFormik'
import useStorage from '@/customHooks/useStorage'
import { CurrencyValidation } from '@/utilities/validations'
import React from 'react'
import AppSelectBox from './AppSelectBox'
import useSettings from '@/customHooks/useSettings'

const CurrencyForm = () => {
    const { currentUser } = useStorage()
    const {handleChangeInfo} = useSettings()

    const initialValues = {
        currency: currentUser?.user?.currency,
    }

    const onSubmit = (values: any) => {
        handleChangeInfo(values)
    };
    const { handleBlur, handleChange, errors, values, handleSubmit, touched } = useCustomFormik(initialValues, onSubmit, CurrencyValidation)

    return (
        <div>
            <h1 className="text-lg text-black font-bold font-satoshiBold mb-3 flex items-center gap-2">
                Currency
                <span className="font-regular font-satoshiBold text-sm text-gray-400">
                    Choose a default Currency
                </span>
            </h1>

            <form onChange={handleSubmit} onSubmit={handleSubmit}>
                <AppSelectBox value={values.currency} onChange={handleChange} onBlur={handleBlur} topLabel={"Select Currency"}  name='currency'>
                    <option>currency</option>
                    <option value="USD">USD</option>
                    <option value="NGN">NGN</option>
                    <option value="EUR">EUR</option>
                </AppSelectBox>
            </form>
        </div>
    )
}

export default CurrencyForm