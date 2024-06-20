import React, { useState, useRef } from 'react';

const OtpInput = ({ length, onChange } : {length:number, onChange:any}) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef(new Array(length));

  const handleChange = (e:any, index:number) => {
    const value = e.target.value;

    if (value.length === 1 && index < length - 1) {
      const nextInput:any = document.getElementById(`otp-input-${index + 1}`);
      nextInput.focus();
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    onChange(newOtp.join(''));
  };

  const handleKeyDown = (e:any, index:number) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      const prevInput = inputRefs.current[index - 1];
      prevInput.focus();
    }
  };

  const handlePaste = (e:any) => {
    const pasteData = e.clipboardData.getData('text').slice(0, length).split('');
    const newOtp = [...otp];

    pasteData.forEach((char:any, index:number) => {
      if (index < length) {
        newOtp[index] = char;
        const input:any = inputRefs.current[index];
        input.value = char;
      }
    });

    setOtp(newOtp);
    onChange(newOtp.join(''));
  };


  return (
    <div onPaste={handlePaste} className="flex w-full justify-between space-x-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="password"
          id={`otp-input-${index}`}
          maxLength={1}
          className="w-10 h-10 md:w-12 md:h-12 text-lg text-center border rounded focus:outline-none"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(input) => (inputRefs.current[index] = input)}
        />
      ))}
    </div>
  );
};

export default OtpInput;