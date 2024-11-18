import Spinner from '@/components/feedbacks/Spinner'
import { ChangeStaffImageProps } from '@/interfaces/ComponentInterfaces'
import React from 'react'
import Image from 'next/image'
import UploadIcon from '@/components/icons/UploadIcon'

const AddInventoryImage = ({loader=null, image=null}: ChangeStaffImageProps) => {

    return (

        <label htmlFor="file-upload">
            
            {loader?.loading ? <div className='bg-accent-light5 w-[317px] h-[165px] flex flex-col justify-center items-center gap-4'>
                
                <Spinner type={loader?.type} height={loader?.height} width={loader?.width} />
                
                <span className="text-xs font-satoshiMedium text-accent-dark">Uploading</span>
            
            </div> : 
            
            image ? <Image src={image} alt="Profile image" height={100} width={100} className='cursor-pointer' /> : 
            
            <div className='bg-accent-light5 w-[317px] h-[165px] flex flex-col justify-center items-center gap-4'>
            
                <UploadIcon />
            
                <h3 className='font-satoshi text-sm text-accent-main'>Drag & drop files or Browse</h3>
            
                <p className='font-satoshiRegular text-accent-light3 text-sm'>Supported Formats: JPEG, JPG, PNG</p>
            
            </div>}
            
        </label>

    )

}

export default AddInventoryImage