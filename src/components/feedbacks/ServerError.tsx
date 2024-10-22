"use client"
import React from 'react'
import Image from 'next/image'
import AppButton from '../forms/AppButton'
import { ButtonType } from '@/enums/ComponentEnums'
import { RxReload } from "react-icons/rx";
import { useRouter } from 'next/navigation';

const ServerError = () => {
    const router = useRouter();

    const goBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    return (
        <div className='flex flex-col justify-center items-center w-[659px]'>
            <Image src="/images/server.svg" width={456} height={456} alt="Server error image" />
            <h2 className='font-gooperSemibold text-3xl text-accent-dark3 mt-2'>Oops! Server is down 💔💔</h2>
            <p className='font-satoshiMedium text-lg text-center text-accent-dark mt-2'>Sorry for the disruption! Our server is down, but our tech team is on it. We'll be back online shortly.</p>
            <div className='mt-2 w-[200px]'><AppButton text='Try Again' type={ButtonType.PRIMARY} icon={RxReload} handleClick={goBack} /></div>
        </div>
    )
}

export default ServerError