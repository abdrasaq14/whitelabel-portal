import { useCustomFormik } from '@/customHooks/useCustomFormik'
import useStorage from '@/customHooks/useStorage'
import { LanguageValidation } from '@/utilities/validations'
import React from 'react'
import AppSelectBox from './AppSelectBox'
import useSettings from '@/customHooks/useSettings'

const LanguageForm = () => {
    const {handleChangeInfo} = useSettings()

    const { currentUser } = useStorage()


    const initialValues = {
        language: currentUser?.user?.language,
    }

    const onSubmit = (values: any) => {
        handleChangeInfo(values)
    };
    const { handleBlur, handleChange, errors, values, handleSubmit, touched } = useCustomFormik(initialValues, onSubmit, LanguageValidation)

    return (
        <div>
            <h1 className="text-lg text-black font-bold font-satoshiBold mb-3 flex items-center gap-2">
                Language
                <span className="font-regular font-satoshiBold text-sm text-gray-400">
                    Choose a default Language
                </span>
            </h1>

            <form onChange={handleSubmit} onSubmit={handleSubmit}>
                <AppSelectBox value={values.language} onChange={handleChange} onBlur={handleBlur} topLabel={"Select Language"}  name='language'>
                    <option>Language</option>
                    <option value="EN">EN</option>
                    <option value="FN">FN</option>
                    <option value="ES">ES</option>
                </AppSelectBox>
            </form>
        </div>
    )
}

export default LanguageForm