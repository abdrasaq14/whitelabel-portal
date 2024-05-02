import { LayoutOutlet } from '../../../Routes/Layout'



export default function OnboardingLayout() {



  return (
    <>
      <div className='font-sfpro bg-foundation-lightPurple w-screen h-screen flex flex-col overflow-hidden'>
        <div className="w-full hidden sm:flex justify-center items-center bg-foundation-darkPurple h-[60px]">
        <img
                alt='Profitall logo'
                src='/images/logo.svg'
                width={100}
                height={18}
              />
        </div>
            <div className="h-full w-full flex flex-col justify-center items-center  bg-white sm:transparent">
                  <div className="logo-position w-full p-4 flex sm:hidden items-center justify-center">
                  <img alt="Client Portal powered by Profitall" src="/client-asset/Client_logo.svg" />
                  </div>
                <LayoutOutlet />
                  {/* Powered by Profitall */}
                  <div className="w-full mt-4 lg:mt-0 p-4 flex items-center justify-center">
                  <img alt="powered by Profitall" src="/images/PoweredbyProfitall.svg" />
                  </div>
            </div>
       
      </div>
    </>
  
  );
}
