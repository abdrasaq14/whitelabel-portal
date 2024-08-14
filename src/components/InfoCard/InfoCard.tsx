import React from "react";

import {
  IsPosOrNeg,
} from "../../utils/percentageUtil";

export interface InfoProps {
  header: string;
  value?: string;
  percentage?: string;
  className?: string;
  iconName?: string;
  iconBg?: "#470E81" | "#FCB706" | "#169D1B" | "#9B8442" | "#A077E6" | "#F03738";
  timeline?: string[]
}

export const InfoCard = ({
  header,
  value,
  percentage = "",
  className,
  iconName,
  iconBg,
  timeline
}: InfoProps) => {
  return (
    <div
      className={`max-w-[246px]  mx-auto w-full py-1.5 px-3 h-auto min-h-[140px] bg-white  rounded shadow ${className}`}
    >
      <div className="w-full flex justify-between">
      <h4 className='my-3 text-xs font-satoshiMedium font-medium'>{header}</h4>
      <div style={{ backgroundColor: iconBg }} className={`w-[40px]  flex items-center justify-center h-[40px] rounded-full`}>
        <img src={`/icons/info/${iconName}.svg`} alt="Icon" />
      </div>
      </div>
   
    
      <div className='flex items-center justify-between'>
        {value &&  <h3 className='text-xl font-semibold font-satoshi'>{value}</h3>}

        {percentage &&
          (IsPosOrNeg(percentage) === "pos" ? (
            <span className="font-normal text-green-500 p-1 bg-green-100 text-xs flex-row flex items-center gap-1">
              <img src="/icons/trending-up.svg" alt="u" /> {percentage}
            </span>
          ) : (
            <span className="font-normal text-red-500 p-1 bg-red-100 text-xs flex-row flex items-center gap-1">
              <img src="icons/trending-down.svg" alt="d" /> {percentage}
            </span>
          ))}
 
      </div>
      {
        timeline &&(
          <div className="w-full flex justify-between my-4 gap-2">
          <p className="text-[#000000]/25 text-xs font-medium font-satoshiMedium whitespace-nowrap">{timeline[0]}</p>
          <p className="text-[#000000]/25 text-xs font-medium font-satoshiMedium whitespace-nowrap">{timeline[1]}</p>
          <p className="text-primary bg-foundation-lightPurple p-1 rounded text-xs font-medium font-satoshiMedium whitespace-nowrap">{timeline[2]}</p>
          </div>
        )
      }
     
    </div>
  );
};
