import { useCustomFormik } from '@/customHooks/useCustomFormik'
import { ButtonType, CardType, ModalFooterType, ModalHeaderType, SpinnerType, TextboxType } from '@/enums/ComponentEnums'
import useSettings from '@/customHooks/useSettings';
import { ChangePasswordValidation } from '@/utilities/validations';
import React from 'react'
import AppTextBox from './AppTextBox';
import ValidationError from './ValidationError';
import { BsExclamationCircle } from "react-icons/bs";
import AppButton from './AppButton';

const ChangePasswordForm = () => {
    const { handleChangePassword, loading } = useSettings()


    const initialValues = {
        password: "",
        oldPassword: "",
        confirmPassword: "",
    };

    const onSubmit = (values: any) => {
        handleChangePassword(values);
    };

    const { handleBlur, handleChange, errors, values, handleSubmit, touched } = useCustomFormik(initialValues, onSubmit, ChangePasswordValidation)
    return (
        <div>
            <h1 className="text-lg text-black font-bold font-satoshiBold mb-3 flex items-center gap-2">
                Password
                <span className="font-regular font-satoshiBold text-sm text-gray-400">
                    Change Password
                </span>
            </h1>

            <form onSubmit={handleSubmit}>


                <div className='w-full mt-5'>
                    <AppTextBox
                        name="oldPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.oldPassword}
                        topLabel="Current Password"
                        type={TextboxType.PASSWORD}
                        placeholder="******************"
                        bottomLabel={touched.oldPassword && errors.oldPassword ? <ValidationError icon={BsExclamationCircle} message={String(errors.oldPassword)} /> : ""}
                    />
                </div>
                <div className='w-full mt-5'>
                    <AppTextBox
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        topLabel="New Password"
                        type={TextboxType.PASSWORD}
                        placeholder="******************"
                        bottomLabel={touched.password && errors.password ? <ValidationError icon={BsExclamationCircle} message={String(errors.password)} /> : ""}
                    />
                </div>
                <div className='w-full mt-5'>
                    <AppTextBox
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        topLabel=" Repeat Password"
                        type={TextboxType.PASSWORD}
                        placeholder="******************"
                        bottomLabel={touched.confirmPassword && errors.confirmPassword ? <ValidationError icon={BsExclamationCircle} message={String(errors.confirmPassword)} /> : ""}
                    />
                </div>

                <div className='w-full mt-5'>
                    <AppButton loader={{ loading, type: SpinnerType.SECONDARY, height: 25, width: 25 }} type={ButtonType.PRIMARY} text='Change Password' handleClick={() => { }} />
                </div>


            </form>

        </div>
    )
}

export default ChangePasswordForm