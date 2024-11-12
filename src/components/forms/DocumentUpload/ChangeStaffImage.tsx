import Spinner from '@/components/feedbacks/Spinner'
import GalleryAddIcon from '@/components/icons/GalleryAddIcon'
import { ChangeStaffImageProps } from '@/interfaces/ComponentInterfaces'
import React from 'react'
import Image from 'next/image'

const ChangeStaffImage = ({loader=null, image=null}: ChangeStaffImageProps) => {
  return (
    <label htmlFor="file-upload">
        {loader?.loading ? 
            <div className='h-[80px] w-[80px] border border-black rounded-full flex flex-col justify-center items-center'>
                <Spinner type={loader?.type} height={loader?.height} width={loader?.width} />
                <span className="text-xs font-satoshiMedium text-accent-dark">Uploading</span>
            </div> : 
            image ? <Image src={image} alt="Profile image" height={100} width={100} className='rounded-full cursor-pointer' /> : 
            <div className='h-[80px] w-[80px] border border-black rounded-full flex justify-center items-center cursor-pointer'>
                <GalleryAddIcon />
            </div>}
    </label>
  )
}

export default ChangeStaffImage