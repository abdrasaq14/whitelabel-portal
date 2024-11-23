import React, { useState, useEffect } from 'react';
import AdminForm from './AdminForm';
import useStorage from '@/customHooks/useStorage';
import StaffForm from './StaffForm';

const AccountInformationForms = () => {
  const { currentUser } = useStorage();
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Avoid rendering anything on the server side
  }

  return (
    <>
      {currentUser?.user?.role === 'Admin' ? (
        <AdminForm currentUser={currentUser?.user} />
      ) : (
        <StaffForm />
      )}
    </>
  );
};

export default AccountInformationForms;