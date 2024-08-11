import React, { useState, useEffect } from 'react';

const ResendOtpButton = ({onResend} : {onResend : () => void}) => {
  const [counter, setCounter] = useState(60); // Set the countdown starting point
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (counter > 0) {
      const timerId = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsButtonDisabled(false);
    }
  }, [counter]);

  const handleResendClick = () => {
    setCounter(60);
    setIsButtonDisabled(true);
    onResend()
    // Add your resend OTP logic here
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className={` text-primary py-2 rounded ${
          isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ""
        }`}
        onClick={handleResendClick}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? `Resend code in ${counter}s` : 'Resend code'}
      </button>
    </div>
  );
};

export default ResendOtpButton;
