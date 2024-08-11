// components/CountdownComponent.js
import { useState, useEffect } from 'react';
import { RefreshIcon } from '../common/Icon';

const CountdownComponent = () => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleRefresh = () => {
    setTimeLeft(60);
  };

  return (
    <>
      {timeLeft > 0 ? (
        <span className=' text-[#6F7174] text-base font-bold font-satoshiBold inline-flex' id="countdown"> Resend code in ({Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60})</span>
      ) : (
        <button id="refreshButton" className='text-white bg-primary px-2 py-1 rounded-md inline-flex gap-1 ' onClick={handleRefresh}>
            <RefreshIcon />
            resend</button>
      )}
    </>
  );
};

export default CountdownComponent;
