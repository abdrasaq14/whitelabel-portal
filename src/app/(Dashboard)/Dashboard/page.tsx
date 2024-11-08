"use client"
import React, {useEffect} from 'react'
import useNavigation from '@/customHooks/useNavigation';
import useDashboard from '@/customHooks/useDashboard';
import AppCard from '@/components/utilities/AppCard';
import { CardType } from '@/enums/ComponentEnums';
import BriefcaseIcon from '@/components/icons/BriefcaseIcon';
import StatsCard from '@/components/utilities/StatsCard';
import PeopleIcon from '@/components/icons/PeopleIcon';
import CubesIcon from '@/components/icons/CubesIcon';
import BarGraph from '@/components/charts/BarGraph';
import SummaryCard from '@/components/utilities/SummaryCard';

const page = () => {

  const {stats, loading} = useDashboard();

  const {checkUserAuthenticity} = useNavigation();

  useEffect(() => checkUserAuthenticity(), []);

  return (
    <div>
      
      <div className="grid grid-cols-4 gap-4">
        <StatsCard 
          title='Total Sales' 
          icon={<BriefcaseIcon />} 
          value={stats?.totalSales} 
          loading={loading}
          actionButtons={[{text: 'All', action: () => {console.log("All")}}, {text: 'Last Month', action: () => {console.log("Last month")}}, {text: 'This Month', action: () => {console.log("This month")}}]} 
        />
        <StatsCard 
          title='Total Merchants' 
          icon={<PeopleIcon />} 
          value={stats?.totalMerchants} 
          loading={loading}
          // actionButtons={[{text: 'All', action: () => {console.log("All")}}, {text: 'Last Month', action: () => {console.log("Last month")}}, {text: 'This Month', action: () => {console.log("This month")}}]} 
        />
        <StatsCard 
          title='Total Products' 
          icon={<CubesIcon />} 
          value={stats?.totalProducts} 
          loading={loading}
          // actionButtons={[{text: 'All', action: () => {console.log("All")}}, {text: 'Last Month', action: () => {console.log("Last month")}}, {text: 'This Month', action: () => {console.log("This month")}}]} 
        />
        <StatsCard 
          title='Total Inventory' 
          icon={<BriefcaseIcon />} 
          value={stats?.totalInventory} 
          loading={loading}
          // actionButtons={[{text: 'All', action: () => {console.log("All")}}, {text: 'Last Month', action: () => {console.log("Last month")}}, {text: 'This Month', action: () => {console.log("This month")}}]} 
        />
        <StatsCard 
          title='Total Inventory Disbursed' 
          icon={<CubesIcon />} 
          value={stats?.totalInventoryDisbursed} 
          loading={loading}
          // actionButtons={[{text: 'All', action: () => {console.log("All")}}, {text: 'Last Month', action: () => {console.log("Last month")}}, {text: 'This Month', action: () => {console.log("This month")}}]} 
        />
      </div>

      <div className="grid grid-cols-5 gap-4 mt-10">
        <div className='col-span-3'>
          <AppCard type={CardType.NOSHADOW}>
            <h2 className="text-accent-main text-sm font-satoshiBold">Monthly Sales</h2>
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
          </AppCard>
        </div>

        <div className='col-span-2'>
          <SummaryCard 
            title='Top Selling Category' 
            loading={loading} 
            actionButtons={[
              {text: 'Last Month', action: () => console.log("Last Month")}, 
              {text: 'This Month', action: () => console.log('This Month')}
            ]}>
              <div></div>
          </SummaryCard>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-10">
        <SummaryCard 
          title='Top Selling Products' 
          loading={loading} 
          actionButtons={[
            {text: 'Last Month', action: () => console.log("Last Month")}, 
            {text: 'This Month', action: () => console.log('This Month')}
          ]}>
            <div></div>
        </SummaryCard>
        <SummaryCard 
          title='Top 5 Revenue Generation Ventures' 
          loading={loading} 
          actionButtons={[
            {text: 'Last Month', action: () => console.log("Last Month")}, 
            {text: 'This Month', action: () => console.log('This Month')}
          ]}>
            <div></div>
        </SummaryCard>
      </div>

    </div>
  )
}

export default page