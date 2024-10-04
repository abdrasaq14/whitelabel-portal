import React, { useEffect, useState } from 'react'
import { BreadCrumbClient } from '../../../components/Breadcrumb'
// import SearchInput from '../../../components/FormInputs/SearchInput'
import Button from '../../../components/Button/Button2'
import Products from './Products'
import Merchants from './Merchants'
import Filter from '../../../components/Filter/Filter'

const ProductDiscovery = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterParams, setFilterParams] = useState<any>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const accountTabTitle = [
    {
      title: 'Merchants',
      icon: '/icons/active-people.svg',
      active: '/icons/sidebar/people.svg'

    },
    {
      title: 'Products',
      icon: '/icons/note-text.svg',
      active: 'icons/sidebar/note.svg',
    },
  ]
  const [tabIndex, setTabIndex] = useState<number>(0)
  const displayAccountContent = (tabIndex: number) => {
    // setShowFilter(false)
    switch (tabIndex) {
      case 0:
        return <Merchants onShowFilter={(e) => setShowFilter(e)} filterParams={filterParams} setLoading={(e) => setIsLoading(e)} />
      case 1:
        return <Products onShowFilter={(e) => setShowFilter(e)} filterParams={filterParams} setLoading={(e) => setIsLoading(e)} />
      default:
        return <Merchants onShowFilter={(e) => setShowFilter(e)} filterParams={filterParams} setLoading={(e) => setIsLoading(e)} />
    }
  }
  useEffect(() => {
    setShowFilter(false)
    setFilterParams({})
  }, [tabIndex])
  return (
    <div className='px-4 pt-8 h-full'>
      <Filter isLoading={isLoading} type={tabIndex === 0 ? 'merchant' : "product"} onFilter={(e: any) => setFilterParams(e)} onClose={() => {
        setShowFilter(false)
        setFilterParams({})
      }} open={showFilter} />
      <div className='bg-white rounded-md h-auto w-full p-8 flex flex-col'>
        <div className='flex  justify-between items-center'>
          <BreadCrumbClient backText="Dashboard" currentPath="Product Discovery" brand='Landmark' />
          <p className='border border-primary rounded-xl bg-[#C8CCD0] '>{accountTabTitle.map((val, index) => (
            <Button
              key={index}
              type="button"
              className={`py-2 px-6  !rounded-xl text-base font-medium font-satoshiMedium  active:text-white transition-all whitespace-nowrap
                    ${tabIndex === index && 'text-white bg-primary'}
                    ${tabIndex !== index && 'text-primary-text'}
                  `}
              onClick={() => setTabIndex(index)}
            >
              <img src={tabIndex === index ? val.icon : val.active} alt='' className='w-5 h-5 inline mr-2' />
              {val.title}
            </Button>
          ))}</p>
        </div>
        <div className='mt-4'>{displayAccountContent(tabIndex)}</div>
      </div>
    </div>
  )
}

export default ProductDiscovery