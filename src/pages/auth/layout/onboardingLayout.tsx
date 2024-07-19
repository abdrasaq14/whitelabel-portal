import { LayoutOutlet } from '../../../Routes/Layout'
import {useLocation} from 'react-router-dom'


export default function OnboardingLayout() {
    const location = useLocation()

  return (
    <div className=' w-screen h-screen '>
      <div className='overflow-y-auto h-full flex flex-col bg-white sm:bg-foundation-lightPurple'>
      <div className="w-full hidden sm:flex justify-center items-center bg-white p-2  shadow h-[64px] border-b-[1px] border-foundation-darkPurple ">
        <img
                alt='Client logo'
                src='/client-asset/Logo_Landmark.svg'
                width={100}
                height={18}
              />
        </div>
          <div className="h-full w-full flex flex-col justify-center items-center  sm:bg-foundation-lightPurple ">
                  <div className="logo-position w-full p-4 flex sm:hidden items-center justify-center">
                  <img alt='Client logo'
                src='/client-asset/Logo_Landmark.svg' />
                  </div>
                <LayoutOutlet />

              {location.pathname !== "/setup" && <div className="w-full mt-4 lg:mt-0 p-4 flex items-center justify-center">
                  <img alt="powered by Profitall" src="/images/PoweredbyProfitall.svg"/>
              </div>}
                </div> 

      </div>
      
    </div>
  
  );
}
