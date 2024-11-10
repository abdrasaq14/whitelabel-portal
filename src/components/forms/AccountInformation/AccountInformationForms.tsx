import React from 'react'
import AdminForm from './AdminForm'
import useStorage from '@/customHooks/useStorage'
import StaffForm from './StaffForm';

const AccountInformationForms = () => {

  const {currentUser} = useStorage();

  console.log("Current user", currentUser);

  return (

    <>

      {currentUser?.user?.role === 'Admin' ? <AdminForm currentUser={currentUser?.user} /> : <StaffForm />}

    </>
  
  )

}

export default AccountInformationForms