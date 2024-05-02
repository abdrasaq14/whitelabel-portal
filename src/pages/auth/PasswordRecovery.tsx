import React, {useState} from 'react'
import  PasscodeInput  from '../../components/FormInputs/PasscodeInput';
import * as Yup from "yup";
import { Formik, Form, Field, FieldProps } from 'formik';
import { MdMailOutline,MdOutlineArrowForward } from "react-icons/md";
import CountdownComponent from '../../components/Countdown';
import { useNavigate } from 'react-router-dom';




export const PasswordRecovery = () => {
  const navigate = useNavigate()
 
    const validationSchema = Yup.object().shape({
        passcode: Yup.string()
          .trim()
          .matches(/^\d{6}$/, 'Passcode must be exactly 6 digits')
          .required('Passcode is required'),
      });

    const initialValues = {
        passcode: '',
     };
  
 
    const handleSubmit = (values: any) => {
      console.log('Form submitted with values:', values);
      navigate("/reset-password")

    };

    const email= "clientemail@clientdomain.co"
  return (
    <main className='bg-white sm:border-[0.4px] sm:border-foundation-darkPurple h-auto  rounded-lg  w-full sm:w-[464px] py-4 px-12 sm:shadow-custom max-h-[413px]'>
         <h2 className='text-2xl font-gooperBlack font-extrabold sm:text-center  text-black mb-2'> Password Recovery </h2>
            <p className='text-base mb-8 font-normal sm:text-center mt-2 font-satoshiMedium text-grayish3'>
            Lorem ipsum dolor sit amet consectetur. Urna eget lobortis rhoncus suspendisse cursus tristique eu turpis.
        </p>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}  validationSchema={validationSchema} >
            <Form>
                <div className='px-2'>
                
                <Field name="passcode" label="">
                    {(fieldProps: FieldProps<string>) => (
                    <PasscodeInput name={fieldProps.field.name} /> 
                    )}
                </Field>
                </div>
                <p className='mt-4 font-satoshiRegular text-[#6F7174] text-sm font-normal'>Enter the verification  code sent to your email address {email}</p>
                <div className='flex gap-2 items-center mt-4'>
                <p className=' text-[#6F7174] text-base font-bold font-satoshiBold '>Didn’t get Code?  </p> <CountdownComponent/>

                </div>
                
               
                <button
                    type='submit'
                    disabled={false}
                    className='bg-primary w-full rounded-lg text-white text-base inline-flex gap-2 mt-8 items-center justify-center text-center p-3 font-medium disabled:bg-opacity-50 disabled:cursor-not-allowed'
                  >
                      Proceed <span><MdOutlineArrowForward size={16}  /></span>
                  </button>
            </Form>
        </Formik>
        <div className="w-full p-4 mt-8 hidden sm:flex  items-center justify-center">
                  <img alt="Client Portal powered by Profitall" src="/client-asset/Client_logo.svg" width={58} height={20} />
         </div>
        
        

    </main>
  )
}

