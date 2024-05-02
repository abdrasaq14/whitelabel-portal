import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoCopyOutline,IoEye, IoEyeOff } from "react-icons/io5";

interface OutputItf {
    val:string,
    onCopy?:(e:any) => void
}

const Output = ({val = "", onCopy = () => {}  }:OutputItf) => {
    const [show, setShow] = useState(false)
    return (
        <div className='relative w-full h-[48px] border rounded  my-2'>
            <input  value={val} disabled type={show ?'text': 'password'} className='h-full w-full pl-3  pr-20 relative   disabled:bg-[#eef0f1] ' />
            <button onClick={async() => {
                await navigator.clipboard.writeText(val)
                toast.success("copied")
                }} className='absolute right-12 bottom-3' >
            <IoCopyOutline color="#2B2C34" />
            </button>
            
            <button className='absolute right-4 bottom-3' onClick={()=>setShow(!show)}>{
                show ?  <IoEye color='#2B2C34' /> : <IoEyeOff color='#2B2C34' />
            }</button>

        </div>
    )
}

export default Output