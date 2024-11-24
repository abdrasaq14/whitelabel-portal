"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import AppButton from '../forms/AppButton'
import { ButtonType } from '@/enums/ComponentEnums'
import { RxReload } from "react-icons/rx";
import useNavigation from '@/customHooks/useNavigation'
import Link from 'next/link'

const ServerError = () => {

    const {push, goBack} = useNavigation()

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(typeof window !== 'undefined');
    }, []);

    const goBackNow = () => {
        if (isClient && window.history.length > 1) {
            goBack();
        } else {
            push('/');
        }
    };

    if (!isClient) return null;

    return (
        <div className='flex flex-col justify-center items-center w-[659px]'>
            <Image src="/images/server.svg" width={456} height={456} alt="Server error image" />
            <h2 className='font-gooperSemibold text-3xl text-accent-dark3 mt-2'>Oops! Server is down 💔💔</h2>
            <p className='font-satoshiMedium text-lg text-center text-accent-dark mt-2'>Sorry for the disruption! Our server is down, but our tech team is on it. We'll be back online shortly.</p>
            <div className='mt-2 w-[200px]'><AppButton text='Try Again' type={ButtonType.PRIMARY} icon={RxReload} handleClick={goBackNow} /></div>
            <Link href={'/Dashboard'} className='text-base text-accent-dark font-satoshiRegular mt-5'>Go Home</Link>
        </div>
    )
}

export default ServerError