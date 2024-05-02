
import React, { useState } from "react"
import { fDate } from "../../utils/formatTime";

const ChatPrompt = ({ isEmail}: { isEmail: boolean }) => {
    const date: any = Date.now()
    const [loading, setLoading] = useState(false)
    const [body, setBody] = useState({
        email: "",
        name: ""
    })
    return (
        <div>
            <div className={`flex justify-start mb-2`}>
                <div className={` text-sm p-2 rounded-t rounded-b rounded-l bg-[#470E810D] text-gray-800`}>
                    Hi there. How can I help you today?
                    <div className={`text-[10px] text-right block text-gray-600`}>
                        {fDate(date)}
                    </div>
                </div>

            </div>
            {isEmail &&
                <div className='w-full border p-3 my-3 rounded '>
                    <div className=''>
                        <label className='text-xs'>Name</label>
                        <input onChange={(e) => setBody({ ...body, name: e.target.value })} className='w-full text-sm h-10 rounded-lg px-3 border' placeholder='Enter your Name' />
                    </div>
                    <div className='mt-2'>
                        <label className='text-xs'>Email</label>
                        <input onChange={(e) => setBody({ ...body, email: e.target.value })} className='w-full text-sm h-10 rounded-lg px-3 border' placeholder='Enter your email address' />
                    </div>
                    <button onClick={async () => {
                        setLoading(true)
                       
                    }} disabled={loading} className='ml-auto block disabled:bg-gray-500 px-3 py-2 text-white bg-primary text-sm rounded-lg mt-2'>Send</button>

                </div>
            }

        </div>

    );
};

export default ChatPrompt
