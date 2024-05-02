import React, { useEffect, KeyboardEvent, BaseSyntheticEvent } from 'react';
import { useField, FieldAttributes, FormikErrors } from 'formik';

interface TextInputProps extends FieldAttributes<any> {
  label?: string;
  name: string;
}

const validatePasscode = (value: string): string | undefined => {
  if (!value) return "Passcode is required";
  if (value.split('').some(char => char === "")) return "Please fill in all passcode digits";
};

const Passcode: React.FC<TextInputProps> = ({ label, name, ...restProps }) => {
  const [field, meta, helpers] = useField(name);
  const passcodeArray: string[] = field.value.split('').concat(Array(6 - field.value.length).fill(''));

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = parseInt(e.key);
    if (!(keyCode >= 0 && keyCode <= 9) && e.key !== "Backspace" && !(e.metaKey && e.key === "v")) {
      e.preventDefault();
    }
  };

  const onChange = (e: BaseSyntheticEvent, index: number) => {
    const newValue = e.target.value;
    const newArray = [...passcodeArray];
    newArray[index] = newValue;
    helpers.setValue(newArray.join(''));
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (index > 0) {
        inputRefs[index - 1]?.focus();
      }
    } else if (parseInt(e.key) && index < passcodeArray.length - 1) {
      inputRefs[index + 1]?.focus();
    }
  };

  const inputRefs: HTMLInputElement[] = [];

  const onFocus = (index: number) => {
    inputRefs[index].focus();
  };

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const clipboardContent = event.clipboardData?.getData('text');
    if (!clipboardContent) return;
    const newArray = clipboardContent.split('').slice(0, passcodeArray.length);
    helpers.setValue(newArray.join(''));
  };

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [passcodeArray]);

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className='text-sm font-normal font-satoshiRegular text-[#344054]'
        >
          {label}
        </label>
      )}
      <div className='flex gap-2 justify-between'>
        {passcodeArray.map((value, index) => (
          <input
            key={index}
            ref={(el) => el && (inputRefs[index] = el)}
            inputMode="numeric"
            maxLength={1}
            type="text"
            value={value}
            onChange={(e) => onChange(e, index)}
            onKeyUp={(e) => onKeyUp(e, index)}
            onKeyDown={(e) => onKeyDown(e)}
            onFocus={() => onFocus(index)}
            className={`bg-white/60 border-[1px] border-[#C8CCD0] rounded-lg text-center h-12 w-12 text-base outline-none sm:text-xl focus:border-primary font-satoshiBold text-[#2B2C34] `}
          />
        ))}
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500"> &#x26A0;  {meta.error}</div>
      )}
    </>
  );
};

export default Passcode;
