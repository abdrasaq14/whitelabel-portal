import { NoDataFoundProps } from '@/interfaces/ComponentInterfaces'
import React from 'react'

const NoDataFound = ({image, text}: NoDataFoundProps) => {
  return (
    <div className='flex flex-col justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center w-1/2'>
          {image}
          <span className='text-accent-dark font-satoshiRegular text-sm'>{text}</span>
        </div>
    </div>
  )
}

export default NoDataFound