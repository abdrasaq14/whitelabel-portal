import ServerError from '@/components/feedbacks/ServerError'
import React from 'react'

const page = () => {
  return (
    <div className="flex justify-center items-center w-full">
        <ServerError />
    </div>
  )
}

export default page