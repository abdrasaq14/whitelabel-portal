import React from 'react'
import Image from 'next/image'
import AppButton from '../forms/AppButton'
import GalleryAddIcon from '../icons/GalleryAddIcon'
import EditIcon from '../icons/EditIcon'
import { ButtonType } from '@/enums/ComponentEnums'
import AccountInformationForms from '../forms/AccountInformation/AccountInformationForms'
import useAccount from '@/customHooks/useAccount'

const AccountTab = () => {

    const {toggleEditMode} = useAccount();

    return (
        <div className='gap-14 flex flex-col'>
            <div className='flex items-center gap-10'>
                <div className='w-1/3'>
                    <h3 className='font-satoshiBold text-base text-accent-dark3'>Brand Logo</h3>
                    <p className='font-satoshiRegular text-sm text-accent-dark mt-2'>The brand logo will be displayed on navigation bar. The company logo must be used as the displayed brand logo.</p>
                    <div className='w-[157px] h-[40px] mt-5'><AppButton text='Change Logo' icon={GalleryAddIcon} type={ButtonType.SECONDARY} handleClick={() => {}} /></div>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src="/images/landmark_logo.svg" alt="Landmark logo" width={164} height={64} />
                    <p className='font-satoshiMedium text-accent-dark text-base'>Administrator</p>
                </div>
            </div>

            <div className='flex gap-10'>
                <div className='w-1/3'>
                    <h3 className='font-satoshiBold text-base text-accent-dark3'>Account Information</h3>
                    <p className='font-satoshiRegular text-sm text-accent-dark mt-2'>Update your personal details here</p>
                    <div className='w-[157px] h-[40px] mt-5'><AppButton text='Edit Account' icon={EditIcon} type={ButtonType.SECONDARY} handleClick={toggleEditMode} /></div>
                </div>
                <div className='flex flex-grow'>
                    <AccountInformationForms />
                </div>
            </div>
        </div>
    )
}

export default AccountTab