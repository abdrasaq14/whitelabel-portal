import React from 'react'
import Output from '../../../components/FormInputs/Output'

const ApiIntegration = () => {
    
  return (
    <div>
        <h3 className="font-medium">API keys & Web Hooks</h3>

        <div className='lg:w-5/12 clear-start mt-6'>
            <h3 className='font-bold'>API Configuration - LIVE MODE</h3>

            <div className='flex mt-3 items-center gap-2'>
                <h3>Warning</h3>
                <img className='h-auto ' src='icons/warning-2.svg' alt='!' />
            </div>

            <h3 className='mt-2 text-landingPagePrimaryBg'>DO NOT USE THIS ON THE CLIENT SIDE.</h3>

            <div className='my-6 w-full'>
                <label className='text-sm text-[#2B2C34]'>Live API Key</label>
                <Output val="dfgahjhsgdyhesioq01wqkw020o3o3" />
                <button className='border-b text-xs font-semibold ml-auto block text-primary border-primary'>Generate new secret keys</button>
            </div>
            <div className='my-6 w-full'>
                <label className='text-sm text-[#2B2C34]'>Live Webhook Url </label>
                <Output val="" />
            </div>

        </div>

        <div className='lg:w-5/12 clear-start mt-6'>
            <h3 className='font-bold'>API Configuration - TEST MODE</h3>

            <div className='flex mt-3 items-center gap-2'>
                <h3>Warning</h3>
                <img className='h-auto ' src='icons/warning-2.svg' alt='!' />
            </div>

            <h3 className='mt-2 text-landingPagePrimaryBg'>This Keys are for testing only. Please DO NOT USE them in production</h3>

            <div className='my-6 w-full'>
                <label className='text-sm text-[#2B2C34]'>Test API Key</label>
                <Output val="dfgahjhsgdyhesioq01wqkw020o3o3" />
                {/* <button className='border-b text-xs font-semibold ml-auto block text-primary border-primary'>Generate new secret keys</button> */}
            </div>
            <div className='my-6 w-full'>
                <label className='text-sm text-[#2B2C34]'>Test Webhook Url </label>
                <Output val="" />
            </div>

        </div>
    </div>
  )
}

export default ApiIntegration