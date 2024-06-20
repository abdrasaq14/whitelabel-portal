import React, { useRef, useState, useEffect } from 'react'
import useOnClickOutside from "../../hooks/useClickOutside";
import { Formik, Form, ErrorMessage, Field, useFormik, FormikProvider } from 'formik'
import TextInput from '../FormInputs/TextInput2';
import PhoneInputField from '../FormInputs/PhoneInput';
import * as Yup from 'yup'
import { CheckboxInput, SelectInput } from '../FormInputs/Checkbox';
import { MdOutlineArrowForward } from "react-icons/md";
import Button from '../Button/Button2';
import { useMutation } from 'react-query';
import { UserService } from '../../services/user';
import toast from 'react-hot-toast';
import FileUpload from '../FormInputs/FIleUpload2';
import { useAuth } from '../../zustand/auth.store';


export const Modal = ({ closeModal, isOpen, children, containerStyle }: any) => {
  const modalRef = useRef<any>();
  useOnClickOutside(modalRef, () => {
    closeModal();
  });
  return (
    <>
      {
        isOpen && (
          <div className='modal-background fixed top-0 left-0 right-0 bottom-0 bg-opacity-60 bg-[#1A002E]'>
            <div className='flex items-center justify-around min-w-44 h-screen'>
              <div ref={modalRef} className={`${containerStyle} p-8 bg-white `}>
                {children}
              </div>

            </div>

          </div>
        )
      }

    </>


  )
}

export const EditStaffModal = ({ isOpen, closeModal, staffInfo }: any) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState<boolean>(false);


  const modalRef = useRef<any>();
  useOnClickOutside(modalRef, () => {
    closeModal();
  });

  interface StaffInfoProps {
    companyName: string;
    staffEmail: string;
    phoneNumber: string;
    role: string;
    allPermission: boolean;
    viewUserDetails: boolean;
    addOrDeleteUser: boolean;
    acceptOrDeclineProduct: boolean;
    banProduct: boolean;
    editUser: boolean;
    generalPermission: boolean;
  }

  const StaffInfoInitialValues: StaffInfoProps = {
    companyName: '',
    staffEmail: '',
    phoneNumber: '',
    role: 'user',
    allPermission: false,
    viewUserDetails: false,
    addOrDeleteUser: false,
    acceptOrDeclineProduct: false,
    banProduct: false,
    editUser: false,
    generalPermission: false
  }

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company name is required'),
    staffEmail: Yup.string().email('Invalid email').required('Staff email is required'),
    phoneNumber: Yup.string(),
    role: Yup.string().required('role is required'),
  });
  const handleSubmit = (values: any) => {
    console.log('Form submitted with values:', values);
    closeModal();
    setIsEditing(false);
  };
  const handleDelete = () => {
    setisDeleteModalOpen(true)
  };

  const deleteStaff = () => {
    if (staffInfo) {
      console.log('delete', staffInfo.name);
      setIsEditing(false);
      closeModal();
    } else {
      console.error('Staff info is undefined');
    }
  }

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
  ];
  return (
    <Modal isOpen={isOpen} closeModal={closeModal} containerStyle='flex flex-col z-10 align-middle max-w-2xl w-[80%] rounded  sm:w-[553px] h-[70%] overflow-y-auto'>
      <div className='full flex justify-between '>
        <div className='flex gap-4 items-center'>
          <img alt='staff avatar' src={staffInfo?.avatar_url} className='h-32 w-28' />
          <div>
            <p className='font-satoshiBold text-xl text-primary-text'>{staffInfo.name}</p>
            <p className='font-satoshiRegular text-sm text-primary-text mt-1'>Staff Id: {staffInfo.staffId}</p>
            <p className='w-16 px-2 py-1 rounded-full bg-green-600 text-white mt-2 flex items-center justify-center text-sm '>{staffInfo.role}</p>
          </div>
        </div>
        <div>
          {isEditing ? (
            <button className='' onClick={() => setIsEditing(false)}>
              <img src='/icons/close-circle.svg' alt='Stop Editting profile' />
            </button>
          ) : (
            <button className='border-[#C8CCD0] border-[1px] text-primary-text px-4 text-sm py-1 rounded-md flex items-center font-medium gap-1' onClick={() => setIsEditing(true)}>
              <img src='/icons/edit.svg' alt='Edit profile' />
              Edit</button>
          )}

        </div>

      </div>
      <div className='flex-grow '>
        <Formik
          initialValues={StaffInfoInitialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikActions) => {
            if (values) {
              handleSubmit(values);
            }
          }}>
          {() => {
            return (
              <Form className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
                <div className='col-span-1'>
                  <TextInput
                    name='companyName'
                    type='text'
                    placeholder='Landmark University'
                    label="Company Name"
                    disabled={!isEditing}

                  />
                </div>

                <div className='col-span-1'>
                  <PhoneInputField
                    label="Phone Number"
                    value="phoneNumber"
                    name='phoneNumber'
                    placeholder="+23420202020"
                    wrapperClass=""
                    disabled={!isEditing}
                  />
                </div>
                <div className='col-span-1'>
                  <TextInput
                    name='staffEmail'
                    type='email'
                    placeholder='linda@framcreative.com'
                    label="Email"
                    disabled={!isEditing}

                  />
                </div>

                <div className='col-span-1 sm:col-span-2 flex flex-col'>

                  <SelectInput
                    name="role"
                    label="Change Role"
                    values={roleOptions}
                    disabled={!isEditing}
                    selectInputClass="w-full sm:w-[60%]"
                  />
                </div>

                <div className='col-span-1 sm:col-span-2 flex flex-col mt-4 sm:mt-8 '>
                  <div className=' '>
                    <CheckboxInput disabled={!isEditing} name="allPermissions" value="All Permissions" />
                  </div>
                  <div className='flex mt-4 sm:mt-8'>
                    <div className=' w-[50%] flex gap-4 flex-wrap'>
                      <CheckboxInput disabled={!isEditing} name="viewUserDetails" value="View User Details" />
                      <CheckboxInput disabled={!isEditing} name="addOrDeleteUser" value="Add/Delete User" />
                      <CheckboxInput disabled={!isEditing} name="acceptOrDeclineProduct" value="Accept/Decline Product" />
                      <CheckboxInput disabled={!isEditing} name="banProduct" value="Ban Product" />
                    </div>
                    <div className='w-[50%] flex justify-end '>
                      <div className='gap-4 flex flex-col '>
                        <CheckboxInput disabled={!isEditing} name="editUser" value="Edit User" />
                        <CheckboxInput disabled={!isEditing} name="generalPermission" value="General Permission" />
                      </div>
                    </div>
                  </div>
                </div>
                {isEditing && (
                  <div className='col-span-1 sm:col-span-2 flex justify-between '>
                    <button
                      type='button'
                      onClick={() => handleDelete()}
                      disabled={false}
                      className='border-red-500 hover:bg-red-500 hover:text-white border-[1px] rounded-lg text-primary text-sm inline-flex gap-2 my-4 items-center justify-center text-center px-8 py-3 font-medium '
                    >
                      Delete Account
                    </button>

                    <button
                      type='submit'
                      disabled={false}
                      className='bg-primary hover:bg-purple-700  rounded-lg text-white text-sm inline-flex gap-2 my-4 items-center justify-center text-center px-12 py-3 font-medium '
                    >
                      Update
                    </button>

                  </div>


                )}



              </Form>
            )
          }}

        </Formik>
        <DeleteModal isOpen={isDeleteModalOpen} closeModal={() => setisDeleteModalOpen(false)} confirmDelete={deleteStaff} />
      </div>
    </Modal>
  )
}


export const DeleteModal = ({ isOpen, closeModal, confirmDelete }: any) => {
  const modalRef = useRef<any>();
  useOnClickOutside(modalRef, () => {
    closeModal();
  });

  const handleConfirmDelete = () => {
    confirmDelete();
    closeModal();
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} containerStyle='flex flex-col p-4 sm:p-8 align-middle max-w-2xl items-center rounded z-24 bg-white w-[70%] sm:w-[400px] h-auto'>
      <div className=''>
        <img src='/images/delete-staff.svg' alt='Delete Staff' className='max-h-[280px]' />
      </div>
      <div>
        <p className='text-red-400 mt-4 text-sm text-center  sm:text-base font-satoshiMedium'>Are you sure you want to delete this Account ?</p>
      </div>
      <div className='w-full flex mt-4 justify-between  '>
        <button
          type='button'
          onClick={() => closeModal()}
          disabled={false}
          className='border-primary-subtext border-[1px] rounded-lg text-primary text-sm inline-flex gap-2  items-center justify-center text-center sm:w-[40%] px-8 py-3 font-medium hover:bg-purple-700 hover:text-white '
        >
          Cancel
        </button>

        <button
          type='button'
          onClick={handleConfirmDelete}
          disabled={false}
          className='bg-primary hover:bg-purple-700 rounded-lg text-white text-sm inline-flex gap-2  items-center justify-center text-center  sm:w-[40%] px-12 py-3  font-medium '
        >
          Yes  <span><MdOutlineArrowForward size={12} /></span>
        </button>
      </div>
    </Modal>
  )
}


export const AddStaffModal = ({ isOpen, closeModal }: any) => {
  const accountTabTitle = ['Add Staff', 'Upload CSV']
  const [tabIndex, setTabIndex] = useState<number>(0)

  const displayAccountContent = (tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        return <AddStaffComponent closeModal={closeModal} setTabIndex={setTabIndex} />
      case 1:
        return <UploadStaffByCsvComponent closeModal={closeModal} />
      default:
        return <h1>hello</h1>
    }
  }
  useEffect(() => {

  }, [tabIndex])


  const modalRef = useRef<any>();
  useOnClickOutside(modalRef, () => {
    closeModal();
  });
  return (
    <Modal isOpen={isOpen} closeModal={closeModal} containerStyle='text-black flex flex-col p-8 align-middle max-w-2xl  z-20 bg-white w-[80%] rounded-xl  sm:w-[553px] h-[70%] overflow-y-auto'>
      <div className="flex items-center mb-10 justify-between gap-10 border-b w-full">
        <div className="flex items-center w-5/6 gap-2">
          {accountTabTitle.map((val, index) => (
            <Button
              key={index}
              type="button"
              className={`py-3 px-6 border-b-2 border-b-transparent !rounded-none hover:text-primary focus:text-primary active:text-primary transition-all whitespace-nowrap
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
    </Modal>
  )
}


export const AddStaffComponent = ({ closeModal, setTabIndex }: any) => {
  const profile: any = useAuth((s) => s.profile)
  interface StaffInfoProps {
    companyName: string;
    staffEmail: string;
    role: string;
    allPermission: boolean;
    viewUserDetails: boolean;
    addOrDeleteUser: boolean;
    acceptOrDeclineProduct: boolean;
    banProduct: boolean;
    editUser: boolean;
    generalPermission: boolean;
  }

  const StaffInfoInitialValues = {
    email: "",
    roleId: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    image: "",
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Company name is required'),
    email: Yup.string().email('Invalid email').required('Staff email is required'),
    roleId: Yup.string().required('role is required'),
  });
  const handleSubmit = (values: any) => {
    console.log('Form submitted with values:', values);
    closeModal();
  };


  const handleAddUser = useMutation(
    async (values: any) => {
      return await UserService.createUser(values)
    },

    {
      onSuccess: (res) => {
        console.log(res);


      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
      }
    }
  )

  const roleOptions = [
    { value: '663a5c8a8b1a1f64469b98e4', label: 'Staff' },
    { value: '663a5c848b1a1f64469b98bf', label: 'Admin' },
  ]

  const form = useFormik({
    initialValues: StaffInfoInitialValues,
    onSubmit: async (values) => {
      handleAddUser.mutate({ whiteLabelName: profile.whiteLabelName, ...values })
      handleSubmit(values);
    }
  })

  return (
    <div className='flex-grow '>
      <FormikProvider value={form} >
        <form onSubmit={form.handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4'>
          <div className='col-span-1'>
            <TextInput
              name='firstName'
              type='text'
              placeholder='john Doe'
              label="First Name"
            />
          </div>
          <div className='col-span-1'>
            <TextInput
              name='lastName'
              type='text'
              placeholder='john Doe'
              label="Last Name"
            />
          </div>

          <div className='col-span-1'>
            <TextInput
              name='email'
              type='email'
              placeholder='linda@framcreative.com'
              label="Email"
            />
          </div>
          <div className='col-span-1'>
            <TextInput
              name='phoneNumber'
              placeholder='linda@framcreative.com'
              label="Phone Number"
            />
          </div>

          <div className='col-span-1 sm:col-span-2 flex flex-col'>
            <select {...form.getFieldProps("roleId")} className='w-full mt-1 px-4  appearance-none text-xs h-10 py-2.5 focus:outline-none rounded-lg bg-white border border-[#470e812b]' name='roleId' >
              <option>Select Role</option>

              {
                roleOptions.map((items: any, id) => <option key={id} value={items.value}>{items.label}</option>)
              }

            </select>
          </div>
          <div className='col-span-1 sm:col-span-2 flex flex-col'>
            <h3 className='text-sm font-normal font-satoshiRegular text-[#344054]' >Staff profile Image</h3>
            <FileUpload name='image' />
          </div>

          <div className='col-span-1 sm:col-span-2 flex flex-col mt-4 sm:mt-8 '>
            <div className=' '>
              <CheckboxInput name="allPermissions" value="All Permissions" />
            </div>
            <div className='flex mt-4 sm:mt-8'>
              <div className=' w-[50%] flex gap-4 flex-wrap'>
                <CheckboxInput name="viewUserDetails" value="View User Details" />
                <CheckboxInput name="addOrDeleteUser" value="Add/Delete User" />
                <CheckboxInput name="acceptOrDeclineProduct" value="Accept/Decline Product" />
                <CheckboxInput name="banProduct" value="Ban Product" />
              </div>
              <div className='w-[50%] flex justify-end '>
                <div className='gap-4 flex flex-col '>
                  <CheckboxInput name="editUser" value="Edit User" />
                  <CheckboxInput name="generalPermission" value="General Permission" />
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-1 sm:col-span-2 flex gap-4 mt-4 justify-between flex-wrap items-center'>
            <div>
              <p className='font-satoshiMedium text-sm text-primary-subtext flex gap-1 items-center'>
                <button
                  type='button'
                  onClick={() => setTabIndex(1)}
                  className='text-[#3581FF] underline'>
                  Add multiple staff </button>

                by uploading csv</p>

            </div>
            <div className='flex gap-4 justify-end w-full sm:w-auto'>
              <button
                type='submit'
                disabled={false}
                onClick={() => closeModal()}
                className='border-[1px] !border-[#470E81] px-8 py-2 rounded-lg text-base font-satoshiMedium  font-medium text-primary-text text-center '
              >
                Cancel
              </button>
              <button
                type='submit'
                className='bg-primary rounded-lg text-white text-sm  text-center px-12 py-3 font-medium '
              >
                Update
              </button>
            </div>


          </div>

        </form>
      </FormikProvider>

    </div>

  )
}

export const UploadStaffByCsvComponent = ({ closeModal }: any) => {
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const FileUploadSchema = Yup.object().shape({
    file: Yup.mixed().required('File is required'),
  })

  const handleSubmit = (values: any) => {
    console.log('Form submitted with values:', values);
    closeModal();
  };

  //   const uploadFile = async (file: File, userId: string) => {
  //   setIsUploading(true)

  //   if(userInfo.image){

  //   }

  //   try {
  //     // Perform the unsigned upload using Cloudinary JavaScript SDK
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('upload_preset', cloudinaryUnsignedUploadPreset); 

  //     // Upload the file to Cloudinary
  //     const response = await axios.post(
  //       `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data'
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       setIsUploading(false)
  //       const imageUrl = response.data.secure_url;
  //       console.log(imageUrl)
  //       const data = await dispatch(updateUserProfileFunc({image: `${imageUrl}`}))
  //       if(data?.payload.status === "success"){
  //         setImageUrl(imageUrl);

  //       }
  //       return imageUrl;
  //     } else {
  //       throw new Error('Error uploading to Cloudinary');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading to Cloudinary:', error);
  //     throw error;
  //   }
  // };

  const handleFileChange = async (event: any) => {

    const file = event.target.files?.[0] || null; // Ensure it's either a File or null
    if (file) {
      setPreview(URL.createObjectURL(file));
      try {
        console.log(preview)

        // const imageUrl = await uploadFile(file, userId);
        // setImageUrl(imageUrl);
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };




  return (
    <div className='flex-grow  '>

      <div onClick={handleButtonClick} role='button' className=' h-[80%] outline-dashed outline-[#C8CCD0] flex flex-col justify-center items-center'  >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".png,.jpg,.jpeg"
          className="hidden" />

        <img alt='upload' src="/images/cloud-upload.svg" />
        <p className='text-center font-satoshiBold font-bold text-primary-text text-sm sm:text-xl'>
          Drag and drop to upload file or <br /> <span className='text-primary'>browse computer</span>
        </p>


      </div>
      <div className='flex gap-4 mt-8 items-center'>
        <button
          type='submit'
          className='bg-primary rounded-lg  text-white text-sm  text-center px-12 py-3 font-medium '
        // disabled={isSubmitting}
        >
          Add Staffs
        </button>
        <button
          type='submit'
          disabled={false}
          onClick={() => closeModal()}
          className='border-[1px] !border-[#470E81]  px-8 py-2 rounded-lg text-base font-satoshiMedium  font-medium text-primary-text text-center '
        >
          Cancel
        </button>


      </div>
    </div>
  )
}
