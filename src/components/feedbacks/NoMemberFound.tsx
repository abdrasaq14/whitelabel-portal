import React from 'react'
import NoMemberIcon from '../icons/NoMemberIcon'

const NoMemberFound = () => {
  return (
    <div className='flex justify-center items-center h-full w-full'>
        {/* <NoMemberIcon /> */}
        <span className='text-accent-dark font-satoshiRegular text-sm w-1/2'>You haven't invited any staff members to the platform yet. You can invite coworkers to join and collaborate with you, and their information will be displayed here."</span>
    </div>
  )
}

export default NoMemberFound