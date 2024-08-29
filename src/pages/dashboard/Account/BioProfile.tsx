import React, { useState } from 'react';
import { Formik, Form, FormikProvider, useFormik } from 'formik';
import TextInput from '../../../components/FormInputs/TextInput2';
import PhoneInputField from '../../../components/FormInputs/PhoneInput';
import { useMutation } from 'react-query';
import { UserService } from '../../../services/user';
import { useAuth } from '../../../zustand/auth.store';
import * as Yup from 'yup';
import { toast } from "react-hot-toast";
import FileUpload from '../../../components/FormInputs/FileUpload';
import { AuthActions } from '../../../zustand/auth.store';

interface BioInfoProps {
  companyName: string;
  companyEmail: string;
  adminName: string;
  adminEmail: string;
  companyPhoneNumber: string;
  adminPhoneNumber: string;
  companyAddress: string;
}

const BioProfile = () => {

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const companyDetails: any = useAuth(state => state.profile);

  const BioInfoInitialValues: BioInfoProps = {
    companyName: companyDetails?.buinessName || '',
    companyEmail: companyDetails?.email || '',
    adminName: companyDetails?.representative?.fullName || '',
    adminEmail: companyDetails?.representative?.email || '',
    companyPhoneNumber: companyDetails?.phoneNumber ? '+234' + companyDetails.phoneNumber.substring(1) : '',
    adminPhoneNumber: companyDetails?.representative?.phoneNumber ? '+234' + companyDetails.representative?.phoneNumber.substring(1) : '',
    companyAddress: '',
  };


  const BioInfoInitialValuesStaff = {
    firstName: companyDetails?.firstName,
    lastName: companyDetails?.lastName,
    email: companyDetails?.email || '',
    phoneNumber: companyDetails?.phoneNumber ? '+234' + companyDetails.phoneNumber.substring(1) : '',
  };
  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company name is required'),
    companyEmail: Yup.string().email('Invalid email').required('Company email is required'),
    adminName: Yup.string().required('Admin name is required'),
    adminEmail: Yup.string().email('Invalid email').required('Admin email is required'),
    companyPhoneNumber: Yup.string().required('Company Phone Number is required'),
    adminPhoneNumber: Yup.string().required('Admin Phone number is required'),
    // companyAddress: Yup.string().required('Company address is required'),
  });

  const validationSchemaStaff = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('last email is required'),
    email: Yup.string().email('Invalid email').required('email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),

  });

  const handleSubmit = useMutation(
    async (values: BioInfoProps) => {
      const editValue = {
        representative: {
          fullName: values?.adminName,
          email: values.adminEmail,
          phoneNumber: values.adminPhoneNumber,
        },
        email: values.companyEmail,
        businessName: values.companyName,
        phoneNumber: values.companyPhoneNumber,
        // companyAddress: values.companyAddress,
      };
      return await UserService.editAdminDetails(editValue);
    },
    {
      onSuccess: (response) => {
        toast.success('Account Information Updated Successfully');
        form.setSubmitting(false);
        AuthActions.setProfile(response.data.result.user)

      },
      onError: (err: any) => {
        form.setSubmitting(false)
        toast.error('An error occurred. Please try again');
      },
    }
  );

  const handleSubmitStaff = useMutation(
    async (values: any) => {

      return await UserService.editAdminDetails(values);
    },
    {
      onSuccess: (response) => {
        toast.success('Account Information Updated Successfully');
        form.setSubmitting(false);
        console.log(response)
        AuthActions.setProfile(response.data.user)

      },
      onError: (err: any) => {
        form.setSubmitting(false)
        toast.error('An error occurred. Please try again');
      },
    }
  );

  const form = useFormik({
    initialValues: companyDetails?.role === "Admin" ? BioInfoInitialValues : BioInfoInitialValuesStaff,
    validationSchema: companyDetails?.role === "Admin" ? validationSchema : validationSchemaStaff,
    onSubmit: (values: any) => {
      companyDetails?.role === "Admin" ? handleSubmit.mutate(values) : handleSubmitStaff.mutate(values)
    },
  });

  const handleEditToggle = () => {
    form.handleSubmit()
    setIsEditing((prevIsEditing) => !prevIsEditing);

  };

  const handleLogoUpload = useMutation(
    async (file: File) => {
      return await UserService.editAdminDetails({ companyLogo: file });
    },
    {
      onSuccess: (response) => {
        form.setSubmitting(false);
        AuthActions.setProfile(response.data.result.user)
        toast.success('Company Logo Updated Successfully');
      },
      onError: (err: any) => {
        form.setSubmitting(false)
        toast.error('An error occurred. Please try again');
      },
    }
  )

  console.log(companyDetails)


console.log("ErrorForm", form.errors)
  return (
    <div>
      <div className='flex flex-wrap-reverse gap-4'>
        {/* Brand Logo Section */}

        {
          companyDetails?.role == "Admin" &&
          <div className='max-w-[250px]'>
            <h2 className='text-base font-satoshiBold font-semibold text-primary-text'>Brand Logo</h2>
            <p className='mt-2 text-sm font-satoshiRegular font-normal text-primary-subtext'>
              The brand logo will be displayed on the navigation bar. The company logo must be used as the displayed brand
              logo.
            </p>
            <FileUpload name='logo' onFileChange={handleLogoUpload.mutate}>
              <button className='mt-4 border-[1px] !border-[#470E81] px-4 py-2 rounded-lg text-base font-satoshiMedium font-medium text-primary-text text-center flex items-center gap-2'>
                <img src='/icons/upload_icon.svg' className='w-5 h-5' alt='upload_icon' />
                Change Logo
              </button>

            </FileUpload>

          </div>
        }


        {/* Client Logo Section */}
        <div>
          <img src={companyDetails?.companyLogo ?? '/client-asset/landmark_logo.png'} className='w-auto h-20' alt='brand_logo' />
          <p className='text-base font-satoshiMedium font-medium text-primary-text text-center'>Administrator</p>
        </div>
      </div>

      {/* Account Information Section */}
      <div className='flex flex-wrap gap-8 sm:gap-16 mt-8'>
        {/* Account Information Card */}
        <div className='max-w-[300px]'>
          <h2 className='text-base font-satoshiBold font-semibold text-primary-text'>Account Information</h2>
          <p className='mt-2 text-sm font-satoshiRegular font-normal text-primary-subtext'>Update your personal details here.</p>

          {/* Toggle Edit Button */}
          {isEditing ?
            <div className='col-span-1 sm:col-span-2 flex gap-2 justify-between '>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                disabled={false}
                className='border-primary hover:bg-primary hover:text-white border-[1px] rounded-lg text-primary text-sm inline-flex gap-2 my-4 items-center justify-center text-center px-8 py-3 font-medium '
              >
                Cancel
              </button>

              <button
                type='submit'
                disabled={false}
                onClick={handleEditToggle}
                className='bg-primary hover:bg-purple-700  rounded-lg text-white text-sm inline-flex gap-2 my-4 items-center justify-center text-center px-12 py-3 font-medium '
                form="newsletterForm"
              >
                Save
              </button>

            </div>
            :
            <button className='mt-8  border-[1px] !border-[#470E81] px-4 py-2 rounded-lg text-sm font-satoshiRegular font-normal text-primary-text text-center flex items-center gap-2'
              onClick={() => setIsEditing(true)}
            >
              <img
                src="/icons/edit.svg"
                className="w-5 h-5"
                alt="edit_icon"
              />
              Edit Account
            </button>

          }
        </div>

        {/* Form Section */}
        {
          companyDetails?.role === "Admin" ?

            <div className='flex-grow'>
              <FormikProvider value={form}>
                <form onSubmit={form.handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <TextInput
                    name='companyName'
                    type='text'
                    placeholder='Company Name'
                    label='Company Name'
                    disabled={true}
                  />
                  <TextInput
                    name='adminName'
                    type='text'
                    placeholder='Admin Name'
                    label='Admin Name'
                    disabled={!isEditing}
                  />
                  <TextInput
                    name='companyEmail'
                    type='email'
                    placeholder='Company Email'
                    label='Company Email'
                    disabled={true}
                  />
                  <TextInput
                    name='adminEmail'
                    type='email'
                    placeholder='Admin Email'
                    label='Admin Email'
                    disabled={!isEditing}
                  />
                  <PhoneInputField
                    label='Company Phone Number'
                    value='companyPhoneNumber'
                    name='companyPhoneNumber'
                    placeholder='+23420202020'
                    wrapperClass='mb-4'
                    disabled={true}
                  />
                  <PhoneInputField
                    label='Admin Phone Number'
                    value='adminPhoneNumber'
                    name='adminPhoneNumber'
                    placeholder='+23420202020'
                    wrapperClass='mb-4'
                    disabled={!isEditing}
                  />
                  {/* <TextInput
                name='companyAddress'
                type='text'
                placeholder='Company Address'
                label='Company Address'
                disabled={!isEditing}
              /> */}

                </form>
              </FormikProvider>
            </div>
            :
            <div className='flex-grow'>
              <FormikProvider value={form}>
                <form className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <TextInput
                    name='firstName'
                    type='text'
                    placeholder='Fist Name'
                    label='FirstName'
                    disabled={!isEditing}
                  />
                  <TextInput
                    name='lastName'
                    type='text'
                    placeholder='Fist Name'
                    label='LastName'
                    disabled={!isEditing}
                  />
                  <TextInput
                    name='email'
                    type='email'
                    placeholder='Email'
                    label='Email'
                    disabled={!isEditing}
                  />
                  <PhoneInputField
                    label='Phone Number'
                    value='phoneNumber'
                    name='phoneNumber'
                    placeholder='+23420202020'
                    wrapperClass='mb-4'
                    disabled={!isEditing}
                  />
                  {/* <TextInput
                name='companyAddress'
                type='text'
                placeholder='Company Address'
                label='Company Address'
                disabled={!isEditing}
              /> */}

                </form>
              </FormikProvider>
            </div>
        }
      </div>
    </div>
  );
};

export default BioProfile;
