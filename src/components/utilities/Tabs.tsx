import { TabsProps } from '@/interfaces/ComponentInterfaces';
import React, { useState } from 'react';

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex border-b border-accent-lighter mb-4 px-5">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`gap-5 py-2 px-4 transition-all ease-in-out hover:scale-110 delay-350 duration-700 text-base ${
              activeTab === index
                ? 'text-purple-main border-b-2 border-purple-main font-satoshiBold'
                : 'text-accent-light hover:text-purple-main font-satoshiMedium'
            }`}
          >
            {tab.label}
            {
              tab.counter !== undefined && <span className={`w-[24px] h-[20px] py-1 px-2 rounded-lg text-xs font-satoshiMedium ml-2 text-white ${activeTab === index ? `bg-purple-main` : `bg-accent-light`}`}>
                {tab.counter}
              </span>
            }
          </button>
        ))}
      </div>

      <div className="p-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;