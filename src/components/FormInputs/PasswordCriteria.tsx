import React from "react";

const PasswordCriteria = ({ password }: any) => {
  const criteria = {
    length: password.length >= 8,
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*]/.test(password),
    upperCase: /[A-Z]/.test(password),
    lowerCase: /[a-z]/.test(password),
  };

  return (
    <ul className="grid text-[14px]  grid-cols-1 sm:grid-cols-2 list-disc mt-2  ml-4">
        <li className="col-span-1 ml-2" style={{ color: criteria.length ? "#4B0082" : "#C8CCD0" }}>
            <small>minimum 8 characters</small>
        </li>
        <li className="col-span-1 ml-2" style={{ color: criteria.specialChar ? "#4B0082" : "#C8CCD0" }}>
            <small>at least one special character</small>
        </li>
        <li className="col-span-1 ml-2" style={{ color: criteria.number ? "#4B0082" : "#C8CCD0" }}>
            <small>at least one number</small>
        </li>
        <li className="col-span-1 ml-2" style={{ color: criteria.upperCase ? "#4B0082" : "#C8CCD0" }}>
            <small>at least one uppercase character</small>
        </li>
        <li className="col-span-1 ml-2" style={{ color: criteria.lowerCase ? "#4B0082" : "#C8CCD0" }}>
            <small>at least one lowercase character</small>
        </li>
    </ul>
  );
};

export default PasswordCriteria;
