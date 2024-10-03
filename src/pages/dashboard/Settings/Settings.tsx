import React, { useEffect, useState } from 'react'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
import Button from '../../../components/Button/Button2'
import Security from './Security'
import OtherSettings from './OtherSettings'
import { useAuth } from '../../../zustand/auth.store'
// import ApiIntegration from './ApiIntegration'
// import Promotion from './Promotion'

const Settings = () => {
  const profile: any = useAuth((s) => s.profile)
  const accountTabTitle = (profile?.roleId === "663a5c848b1a1f64469b98bf" || profile?._doc.roleId === "663a5c848b1a1f64469b98bf") ? ['security', 'settings'] : ['security']
  const [tabIndex, setTabIndex] = useState<number>(0)
  const displayAccountContent = (tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        return <Security />
      // return <BioProfile />
      case 1:
        return <OtherSettings />
      default:
        return <Security />
      // return <BioProfile />
    }
  }
  useEffect(() => {

  }, [tabIndex])
  return (
    <div className='px-4 pt-8 h-full'>
      <div className='bg-white rounded-md h-auto w-full p-8 flex flex-col'>
        <BreadCrumbClient backText="Dashboard" currentPath="Settings" brand='Landmark' />
        <div className="pt-4 pb-10 bg-white rounded-2xl mx-2">
          <div className="flex items-center mb-10 justify-between gap-10 border-b w-full">
            <div className="flex items-center w-5/6 gap-2 flex-wrap">
              {accountTabTitle.map((val, index) => (
                <Button
                  key={index}
                  type="button"
                  className={`py-3 px-6 border-b-2 border-b-transparent !rounded-none hover:text-primary focus:text-primary active:text-primary transition-all
                    ${tabIndex === index && 'text-[#470E81] !border-b-[#470E81]'}
                    ${tabIndex !== index && 'text-[#6C6C73]'}
                  `}
                  onClick={() => setTabIndex(index)}
                >
                  {val}
                </Button>
              ))}
            </div>
          </div>
          {displayAccountContent(tabIndex)}
        </div>
      </div>
    </div>
  )
}

export default Settings