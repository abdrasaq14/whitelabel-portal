import { useRef } from 'react';
import {Modal} from './StaffModal';
import useOnClickOutside from '../../hooks/useClickOutside';
import { MdOutlineLock, MdOutlineArrowForward  } from "react-icons/md";
import RadioInput from '../FormInputs/RadioInput';
import * as Yup from "yup";
import {FormikProvider, useFormik  } from "formik";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { Form } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

export const LoadingModal = ({isOpen, closeModal, type}: any) => {
    const modalRef = useRef<any>();
    useOnClickOutside(modalRef, () => {
      closeModal();
      });
    return (
     <Modal  isOpen={isOpen} closeModal={closeModal} containerStyle="text-black flex flex-col justify-center items-center align-middle max-w-2xl  z-20 bg-white w-[80%] rounded-xl h-[50%] sm:w-[553px] sm:h-[332px]">
      <div className='h-48 w-48'>
          <img src="/images/verified-account.svg" alt='Account Verified' style={{objectFit: 'contain'}} />
          </div>
                  
        <p className=' font-normal text-base sm:text-xl  text-primary-text mt-8' >
          {type === '2fa' ? '2FA Completed, Account secured' : 'Account Successfully Set up'}</p>
  
     </Modal>
    )
  }



  export const SetUp2FAModal = ({isOpen, closeModal}: any) => {
    const modalRef = useRef<any>();
    useOnClickOutside(modalRef, () => {
      closeModal();
      });
    return (
     <Modal  isOpen={isOpen} closeModal={closeModal} containerStyle="text-black flex flex-col justify-center items-center align-middle max-w-2xl  z-20 w-[80%] rounded-xl h-auto sm:max-w-[416px]  ">
      <div className='w-full flex justify-end'>
        <button onClick={closeModal}>
        <img src="/icons/close-circle-filled.svg" width={20} height={20} alt='Account Verified'  style={{objectFit: 'contain'}} />
        </button>
      </div>
      <div className='h-48 w-48  '>
          <img src="/images/setup-2fa-image.svg" alt='Set Up 2fa' style={{objectFit: 'contain'}} />
      </div>
      <div className='text-center flex flex-col gap-2 '>
        <h2 className=' font-bold font-satoshiBold text-base sm:text-xl  text-primary-text '>It is required to set up 2FA</h2>
        <p className=' font-normal text-xs sm:text-sm  text-primary-text justify-center' >Hey there! We're excited to help you take your account security to the next level. To keep your account secured, we will need you to set up the Two-step verification.</p>
      </div>
      <div className='flex w-full gap-4 justify-between mt-4'>
      <button
        type='button'
        onClick={() => closeModal()}
        disabled={false}
        className='border-primary border-[2px] hover:border-none rounded-lg text-primary text-sm  items-center justify-center text-center w-full py-3 font-medium hover:bg-purple-700 hover:text-white '
          >
           Skip
        </button>
        <button
            type='submit'
            disabled={false}
            className='bg-primary w-full  rounded-lg  text-white text-sm inline-flex gap-2 items-center justify-center text-center py-3 font-normal disabled:bg-opacity-50 disabled:cursor-not-allowed hover:bg-purple-700'>
                Proceed <span><MdOutlineArrowForward size={16}  /></span>
        </button>
      </div>
     </Modal>
    )
  }

  export const Select2FAMethodModal = ({isOpen, closeModal}: any) => {
    const modalRef = useRef<any>();
    useOnClickOutside(modalRef, () => {
      closeModal();
      });
    return (
     <Modal  isOpen={isOpen} closeModal={closeModal} containerStyle="text-black flex flex-col justify-center items-center align-middle max-w-2xl  z-20 w-[80%] rounded-xl h-auto sm:max-w-[416px]  ">
      <div className='text-center'>
      <h2 className='text-xl font-semibold font-gooperBlack text-black mb-4'>Multi Factor Authentication</h2>
      <p className='text-xs sm:text-sm font-bold  font-satoshiBold text-grayish3'>Choose MFA Option.</p>
      </div>
  
      <div className='w-full flex flex-col gap-4 my-4 sm:my-8'>
      <p className=' font-normal text-xs sm:text-sm  text-primary-subtext justify-center' >I want to receive OTP via</p>
      <OTPMethods />
      
      </div>
      
     </Modal>
    )
  }

  export const OTPMethods = () => {
    const validationSchema = Yup.object({
        otpMethod: Yup.string()
        .trim().required("Select an OTP method"),
    });
    const form = useFormik<Yup.Asserts<typeof validationSchema>>({
      initialValues: {
        otpMethod: "",
      },
      validationSchema,
      onSubmit: (values: any) => {
        handleSubmit.mutate(values);
      },
    });

    const handleSubmit = useMutation(
      async (values) => {
        console.log(values)
      },
      {
        onSuccess: (response) => {
          toast.success("login successful");
            form.setSubmitting(false)
  
        },
        onError: (err: any) => {
          toast.error(err.response.data.message);
          form.setSubmitting(false)
        },
      }
    );
    return(
      <div >
        <FormikProvider value={form}>
          <form className='w-full flex flex-col gap-4' >
          <RadioInput name='2faMethod' value='Text Message' />
          <RadioInput name='2faMethod' value='Email Address' />
          <div className='flex w-full mt-4'>
              <button
                  type='submit'
                  disabled={form.isSubmitting}
                  onClick={() => form.handleSubmit()} 
                  className='bg-primary w-full  rounded-lg  text-white text-sm inline-flex gap-2 items-center justify-center text-center py-3 font-normal disabled:bg-opacity-50 disabled:cursor-not-allowed mt-4 hover:bg-purple-700'>
                      {form.isSubmitting ? <Spinner /> : <>
                    Proceed <span><MdOutlineArrowForward size={16}  /></span>
                    </>}
              </button>
            </div>
          </form>
          

        </FormikProvider>
        
      </div>
    )
  }