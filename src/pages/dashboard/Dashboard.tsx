import React, { useState } from 'react'
import { InfoCard } from '../../components/InfoCard/InfoCard'
import { LineChart, LineChart2 } from '../../components/Graph/Graphs/LineChart'
import { GraphWrapper } from '../../components/Graph/GraphWrapper'
import BarGraph from '../../components/Graph/Graphs/BarGraph'

import { sampleVendorData } from '../../utils/ProductList'
import SelectDropdown from '../../components/FormInputs/Select'
import HelpDesk from '../../components/HelpDesk/Helpdesk'
import { useAuth } from '../../zustand/auth.store'
import { useQuery } from 'react-query'
import { DashboardService } from '../../services/dashboard.service'

const Dashboard = () => {
  const timeline = ["All", "Last Month", "This Month"]
  const timeline2 = ["2 months", "Last Month", "This Month"]

  const [isThisMonth, setIsThisMonth] = useState(true);
  const salesData = isThisMonth

  const handleToggle = (isActive: any) => {
    setIsThisMonth(isActive);
  };

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOption1, setSelectedOption1] = useState<string>('');


  const options = [
    { value: 'product', label: 'Products' },
    { value: 'service', label: 'Services' },
    { value: 'merchants', label: 'Merchants' },
  ];


  const { data: monthlySales, } = useQuery(
    "query-dashboard-monthlty-sales",
    async () => {
      return await DashboardService.getMonthleySales();
    },
    {
      enabled: true,
      onSuccess: (res) => {
      },
      onError: (err: any) => {
        console.log("Error Occured:", err.response);
      },

    }
  );

  const { data: infoCardDetails, refetch, } = useQuery(
    "query-dashboard-dashboard-stats",
    async () => {
      return await DashboardService.getDashboardstat();
    },
    {
      enabled: true,
      onSuccess: (res) => {
      },
      onError: (err: any) => {
        console.log("Error Occured:", err.response);
      },

    }
  );

  const { data: topVentures, } = useQuery(
    "query-dashboard-Top-5-Revenue-Generation-Ventures",
    async () => {
      return await DashboardService.getTopVentures();
    },
    {
      enabled: true,
      onSuccess: (res) => {
      },
      onError: (err: any) => {
        console.log("Error Occured:", err.response);
      },

    }
  );
  // const profile = useAuth((state) => state.profile);
  // console.log(profile)

  console.log(infoCardDetails)

  const handleSelectChange = (selectedValue: string) => {
    setSelectedOption(selectedValue);
  };
  const handleSelectChange1 = (selectedValue: string) => {
    setSelectedOption1(selectedValue);
  };
  return (
    <div className='z-1'>
      <div className='md:px-6 py-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 px-2 items-center gap-3 justify-center'>
        <InfoCard header="Total Sales" value={infoCardDetails ? infoCardDetails.data?.result.totalSales.toString() : '0'} iconName='ic_deals' className='flex flex-col justify-between' timeline={timeline} />
        <InfoCard header='Total Merchants' value={infoCardDetails ? infoCardDetails.data?.result.totalMerchants.toString() : '0'} iconName='people' />
        <InfoCard header="Total Products" value={infoCardDetails ? infoCardDetails.data?.result.totalProducts.toString() : '0'} iconName='3dcube' className='' />
        <InfoCard header='Lead Conversion' value={infoCardDetails ? infoCardDetails.data?.result.leadConversion.toString() + "%" : '0'} iconName='trend-up' timeline={timeline2} />

      </div>

      <div className="grid lg:grid-cols-5 h-auto grid-cols-1 px-2 md:px-6 gap-3 mt-6">
        <div className="lg:col-span-3 flex flex-col w-full ">
          <GraphWrapper graphTitle="Montly Sales">
            <BarGraph
              data={{
                stacked: false,
                colors: ["#470E81"],
                xAxisLabel: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                seriesData: [
                  {
                    name: "Services",
                    data: [],
                  }
                ]
              }}
            />

          </GraphWrapper>

        </div>
        <div className="lg:col-span-2  flex flex-col w-full h-full ">
          <div className='w-full mb-3 px-3 py-4 rounded-md bg-white h-full'>
            <div className='flex justify-between'>
              <h3 className='font-bold whitespace-nowrap text-sm text-primary-subtext font-satoshiBold'>Top Selling Category</h3>
              <ToggleDataButton onToggle={handleToggle} />
            </div>
            <div className='mt-8'>
              {/* {sampleVendorData && sampleVendorData?.map((data: any, index: any) => (
                <div key={index}>
                  <SellerInformation storename={data.storeName} storeurl={data.storeName} productSold={data.productsSold} Imageurl='/images/avatar.svg' />
                </div>

              ))} */}

            </div>



          </div>
        </div>
      </div>
      <div className="grid min-h-[400px] h-auto grid-cols-2 px-2 md:px-6 gap-3 mt-6">
        <div className="lg:col-span-1  flex flex-col w-full h-full ">
          <div className='w-full mb-3 px-3 py-4 rounded-md bg-white h-full'>
            <div className='flex justify-between'>
              <h3 className='font-bold whitespace-nowrap text-sm text-primary-subtext font-satoshiBold'>Top Selling product</h3>
              <ToggleDataButton onToggle={handleToggle} />
            </div>
            <div className='mt-8'>
              {/* {sampleVendorData && sampleVendorData?.map((data: any, index: any) => (
                <div key={index}>
                  <SellerInformation storename={data.storeName} storeurl={data.storeName} productSold={data.productsSold} Imageurl='/images/avatar.svg' />
                </div>

              ))} */}

            </div>



          </div>
        </div>
        <div className="lg:col-span-1  flex flex-col w-full h-full ">
          <div className='w-full mb-3 px-3 py-4 rounded-md bg-white h-full'>
            <div className='flex justify-between'>
              <h3 className='font-bold whitespace-nowrap text-sm text-primary-subtext font-satoshiBold'>Top 5 revenue generation ventures</h3>
              <ToggleDataButton onToggle={handleToggle} />
            </div>
            <div className='mt-8'>
              {/* {sampleVendorData && sampleVendorData?.map((data: any, index: any) => (
                <div key={index}>
                  <SellerInformation storename={data.storeName} storeurl={data.storeName} productSold={data.productsSold} Imageurl='/images/avatar.svg' />
                </div>

              ))} */}

            </div>



          </div>
        </div>
      </div>
      <HelpDesk />
    </div>
  )
}

export default Dashboard

const ToggleDataButton = ({ onToggle }: any) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onToggle(!isActive); // Notify parent component about the toggle state
  };
  return (
    <div className="flex">
      <button
        className={`text-xs px-2 rounded-l ${isActive ? 'text-primary bg-foundation-lightPurple' : 'text-[#000000]/25'
          }`}
        onClick={handleClick}
      >
        Last Month
      </button>
      <button
        className={` text-xs px-2 rounded-r ${isActive ? 'text-[#000000]/25' : 'text-primary bg-foundation-lightPurple'
          }`}
        onClick={handleClick}
      >
        This Month
      </button>
    </div>

  )
}

const SellerInformation = ({ storename, storeurl, productSold }: any) => {
  return (
    <div className='flex mt-2 justify-between'>
      <div className='flex gap-4'>
        <img alt='Employee ' src="/images/vendor.svg" className='w-10 h-10' />
        <div>
          <p className='font-satoshiBold text-sm text-primary-text'>{storename}</p>
          <p className='text-sm text-primary-subtext mt-1'>https://marketsq.ng/{storeurl}</p>
        </div>
      </div>
      <div className='border-[1px] shadow-sm p-2 rounded-md '>
        <p className='font-satoshiMedium text-sm text-primary-text'>Product Sold</p>
        <p className='font-gooperBlack text-xs text-primary-text'>{productSold}</p>
      </div>
    </div>
  )
}